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
  try {
    const { fullName, phoneNumber, macAddress, ipAddress, loginMethod } = req.body ?? {};

    if (!fullName || !phoneNumber) {
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

    return res.status(201).json({ id: record.id });
  } catch (error) {
    console.error('Failed to save registration', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Hotspot API listening on :${port}`);
});


