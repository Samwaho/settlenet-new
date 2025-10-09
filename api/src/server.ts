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

// SMS Service Function
async function sendWelcomeSMS(phoneNumber: string, fullName: string): Promise<{ success: boolean; error?: string; transactionId?: string }> {
  if (!SMS_CONFIG.enabled) {
    console.log('SMS sending is disabled');
    return { success: true };
  }

  if (!SMS_CONFIG.apiKey && (!SMS_CONFIG.userId || !SMS_CONFIG.password)) {
    console.error('SMS configuration incomplete - missing credentials');
    return { success: false, error: 'SMS configuration incomplete' };
  }

  try {
    // Format phone number (ensure it has country code)
    let formattedPhone = phoneNumber.trim();
    if (!formattedPhone.startsWith('+')) {
      // Assume Kenya country code if not provided
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '+254' + formattedPhone.substring(1);
      } else if (!formattedPhone.startsWith('254')) {
        formattedPhone = '+254' + formattedPhone;
      } else {
        formattedPhone = '+' + formattedPhone;
      }
    }

    // Create welcome message
    const message = `Welcome to Settlenet WiFi, ${fullName}! You're now connected to our free WiFi network. Enjoy browsing! - Settlenet Network Solutions www.settlenet.co.ke`;

    // Prepare request data
    const requestData = new URLSearchParams({
      sendMethod: 'quick',
      mobile: formattedPhone.replace('+', ''), // Remove + for API
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
    } else {
      requestData.append('userid', SMS_CONFIG.userId!);
      requestData.append('password', SMS_CONFIG.password!);
    }

    console.log(`Sending SMS to ${formattedPhone} for ${fullName}`);

    const response = await axios.post(SMS_CONFIG.apiUrl, requestData, { headers });
    
    console.log('SMS API Response:', response.data);

    if (response.data.status === 'success') {
      return { 
        success: true, 
        transactionId: response.data.transactionId 
      };
    } else {
      return { 
        success: false, 
        error: response.data.reason || 'SMS sending failed' 
      };
    }

  } catch (error) {
    console.error('SMS sending failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown SMS error' 
    };
  }
}

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
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
    sendWelcomeSMS(phoneNumber, fullName)
      .then(smsResult => {
        if (smsResult.success) {
          console.log(`[${requestId}] Welcome SMS sent successfully:`, {
            transactionId: smsResult.transactionId,
            phoneNumber: phoneNumber.substring(0, 3) + '***'
          });
        } else {
          console.error(`[${requestId}] Welcome SMS failed:`, {
            error: smsResult.error,
            phoneNumber: phoneNumber.substring(0, 3) + '***'
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


