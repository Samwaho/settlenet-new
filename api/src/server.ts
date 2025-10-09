import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const app = express();

// SMS Configuration
const SMS_CONFIG = {
  apiUrl: 'https://portal.zettatel.com/SMSApi/send',
  userId: process.env.ZETTATEL_USER_ID,
  password: process.env.ZETTATEL_PASSWORD,
  apiKey: process.env.ZETTATEL_API_KEY,
  senderId: process.env.ZETTATEL_SENDER_ID || 'SETTLENET',
  enabled: process.env.SMS_ENABLED === 'true'
};

app.use(cors({ origin: '*'}));
app.use(express.json());

// Phone number validation and formatting
function formatPhoneNumber(phoneNumber: string): { formatted: string; original: string; valid: boolean; error?: string } {
  const original = phoneNumber.trim();
  
  console.log(`[SMS] Formatting phone number: "${original}"`);
  
  // Remove any non-digit characters except +
  const cleaned = original.replace(/[^\d+]/g, '');
  
  // Handle different input formats
  if (cleaned.startsWith('+')) {
    // Already has country code
    if (cleaned.startsWith('+254')) {
      return { formatted: cleaned, original, valid: true };
    } else {
      return { formatted: cleaned, original, valid: false, error: 'Non-Kenyan number detected' };
    }
  } else if (cleaned.startsWith('254')) {
    // Has country code without +
    return { formatted: '+' + cleaned, original, valid: true };
  } else if (cleaned.startsWith('0')) {
    // Kenyan local format
    const withoutZero = cleaned.substring(1);
    if (withoutZero.length === 9) {
      return { formatted: '+254' + withoutZero, original, valid: true };
    } else {
      return { formatted: '+254' + withoutZero, original, valid: false, error: 'Invalid Kenyan number length' };
    }
  } else if (cleaned.length === 9) {
    // 9 digits without leading 0
    return { formatted: '+254' + cleaned, original, valid: true };
  } else {
    return { formatted: '+254' + cleaned, original, valid: false, error: 'Invalid phone number format' };
  }
}

// SMS Service Function with enhanced logging
async function sendWelcomeSMS(phoneNumber: string, fullName: string, requestId?: string): Promise<{ success: boolean; error?: string; transactionId?: string; formattedPhone?: string }> {
  const smsRequestId = requestId || Math.random().toString(36).substr(2, 9);
  
  console.log(`[${smsRequestId}] SMS sending initiated:`, {
    timestamp: new Date().toISOString(),
    phoneNumber: phoneNumber.substring(0, 3) + '***',
    fullName: fullName.substring(0, 3) + '***',
    smsEnabled: SMS_CONFIG.enabled
  });

  if (!SMS_CONFIG.enabled) {
    console.log(`[${smsRequestId}] SMS sending is disabled via configuration`);
    return { success: true, formattedPhone: phoneNumber };
  }

  if (!SMS_CONFIG.apiKey && (!SMS_CONFIG.userId || !SMS_CONFIG.password)) {
    console.error(`[${smsRequestId}] SMS configuration incomplete:`, {
      hasApiKey: !!SMS_CONFIG.apiKey,
      hasUserId: !!SMS_CONFIG.userId,
      hasPassword: !!SMS_CONFIG.password
    });
    return { success: false, error: 'SMS configuration incomplete' };
  }

  try {
    // Format and validate phone number
    const phoneResult = formatPhoneNumber(phoneNumber);
    
    console.log(`[${smsRequestId}] Phone number formatting result:`, {
      original: phoneResult.original.substring(0, 3) + '***',
      formatted: phoneResult.formatted.substring(0, 3) + '***',
      valid: phoneResult.valid,
      error: phoneResult.error
    });

    if (!phoneResult.valid) {
      console.error(`[${smsRequestId}] Invalid phone number:`, phoneResult.error);
      return { success: false, error: phoneResult.error, formattedPhone: phoneResult.formatted };
    }

    // Create welcome message
    const message = `Welcome to Settlenet WiFi, ${fullName}! You're now connected to our free WiFi network. Enjoy browsing! - Settlenet Network Solutions www.settlenet.co.ke`;
    
    console.log(`[${smsRequestId}] SMS message prepared:`, {
      messageLength: message.length,
      messagePreview: message.substring(0, 50) + '...'
    });

    // Prepare request data
    const requestData = new URLSearchParams({
      sendMethod: 'quick',
      mobile: phoneResult.formatted.replace('+', ''), // Remove + for API
      msg: message,
      senderid: SMS_CONFIG.senderId,
      msgType: 'text',
      duplicatecheck: 'true',
      output: 'json'
    });

    // Add authentication
    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache'
    };

    if (SMS_CONFIG.apiKey) {
      headers['apikey'] = SMS_CONFIG.apiKey;
      console.log(`[${smsRequestId}] Using API key authentication`);
    } else {
      requestData.append('userid', SMS_CONFIG.userId!);
      requestData.append('password', SMS_CONFIG.password!);
      console.log(`[${smsRequestId}] Using username/password authentication`);
    }

    console.log(`[${smsRequestId}] Sending SMS request to Zettatel:`, {
      url: SMS_CONFIG.apiUrl,
      mobile: phoneResult.formatted.replace('+', '').substring(0, 3) + '***',
      senderId: SMS_CONFIG.senderId,
      messageLength: message.length
    });

    const startTime = Date.now();
    const response = await axios.post(SMS_CONFIG.apiUrl, requestData, { 
      headers,
      timeout: 30000 // 30 second timeout
    });
    
    const duration = Date.now() - startTime;
    console.log(`[${smsRequestId}] SMS API response received:`, {
      status: response.status,
      statusText: response.statusText,
      duration: `${duration}ms`,
      responseData: response.data
    });

    if (response.data.status === 'success') {
      console.log(`[${smsRequestId}] SMS sent successfully:`, {
        transactionId: response.data.transactionId,
        mobile: response.data.mobile,
        statusCode: response.data.statusCode,
        reason: response.data.reason
      });
      return { 
        success: true, 
        transactionId: response.data.transactionId,
        formattedPhone: phoneResult.formatted
      };
    } else {
      console.error(`[${smsRequestId}] SMS API returned failure:`, {
        status: response.data.status,
        reason: response.data.reason,
        statusCode: response.data.statusCode,
        invalidMobile: response.data.invalidMobile
      });
      return { 
        success: false, 
        error: response.data.reason || 'SMS sending failed',
        formattedPhone: phoneResult.formatted
      };
    }

  } catch (error) {
    console.error(`[${smsRequestId}] SMS sending failed with error:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown SMS error',
      formattedPhone: phoneNumber
    };
  }
}

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// SMS configuration check endpoint
app.get('/api/sms-config', (_req: Request, res: Response) => {
  res.json({
    enabled: SMS_CONFIG.enabled,
    hasApiKey: !!SMS_CONFIG.apiKey,
    hasUserId: !!SMS_CONFIG.userId,
    hasPassword: !!SMS_CONFIG.password,
    senderId: SMS_CONFIG.senderId,
    apiUrl: SMS_CONFIG.apiUrl,
    configured: !!(SMS_CONFIG.apiKey || (SMS_CONFIG.userId && SMS_CONFIG.password))
  });
});

// Test SMS endpoint for debugging
app.post('/api/test-sms', async (req: Request, res: Response) => {
  const { phoneNumber, fullName } = req.body;
  
  if (!phoneNumber || !fullName) {
    return res.status(400).json({ error: 'phoneNumber and fullName are required' });
  }

  console.log('Testing SMS functionality:', { phoneNumber, fullName });
  
  try {
    const result = await sendWelcomeSMS(phoneNumber, fullName, 'TEST');
    res.json(result);
  } catch (error) {
    console.error('SMS test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// POST /api/hotspot/registrations
app.post('/api/hotspot/registrations', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);
  
  console.log(`[${requestId}] Registration request received:`, {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    body: req.body
  });

  try {
    const { fullName, phoneNumber, macAddress, ipAddress, loginMethod } = req.body ?? {};

    console.log(`[${requestId}] Processing registration for:`, {
      fullName: fullName ? `${fullName.substring(0, 3)}***` : 'undefined',
      phoneNumber: phoneNumber ? `${phoneNumber.substring(0, 3)}***` : 'undefined',
      macAddress,
      ipAddress,
      loginMethod
    });

    if (!fullName || !phoneNumber) {
      console.log(`[${requestId}] Validation failed - missing required fields:`, {
        hasFullName: !!fullName,
        hasPhoneNumber: !!phoneNumber
      });
      return res.status(400).json({ error: 'fullName and phoneNumber are required' });
    }

    const record = await prisma.guestRegistration.create({
      data: {
        fullName,
        phoneNumber,
        macAddress: macAddress ?? null,
        ipAddress: ipAddress ?? null,
        loginMethod: loginMethod ?? 'free',
      },
    });

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] Registration saved successfully:`, {
      recordId: record.id,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });

    // Send welcome SMS (non-blocking)
    sendWelcomeSMS(phoneNumber, fullName, requestId)
      .then(smsResult => {
        if (smsResult.success) {
          console.log(`[${requestId}] Welcome SMS sent successfully:`, {
            transactionId: smsResult.transactionId,
            formattedPhone: smsResult.formattedPhone?.substring(0, 3) + '***',
            originalPhone: phoneNumber.substring(0, 3) + '***'
          });
        } else {
          console.error(`[${requestId}] Welcome SMS failed:`, {
            error: smsResult.error,
            formattedPhone: smsResult.formattedPhone?.substring(0, 3) + '***',
            originalPhone: phoneNumber.substring(0, 3) + '***'
          });
        }
      })
      .catch(error => {
        console.error(`[${requestId}] Welcome SMS error:`, error);
      });

    return res.status(201).json({ 
      id: record.id,
      success: true,
      message: 'Registration saved successfully'
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Failed to save registration:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
    return res.status(500).json({ 
      error: 'Internal Server Error',
      requestId,
      success: false
    });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Hotspot API listening on :${port}`);
});


