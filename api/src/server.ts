import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: '*'}));
app.use(express.json());

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


