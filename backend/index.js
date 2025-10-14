import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { XMLParser } from 'fast-xml-parser';
import CreditReport from './models/CreditReport.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/creditsea', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

// Ensure uploads directory exists
import fs from 'fs';
if (!fs.existsSync('uploads/')) {
  fs.mkdirSync('uploads/');
}

// XML Parser
const parser = new XMLParser();

// Routes
app.post('/api/upload', upload.single('xmlFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read and parse XML
    const fs = await import('fs');
    const xmlData = fs.readFileSync(req.file.path, 'utf8');
    const parsedData = parser.parse(xmlData);

    // Extract data (assuming XML structure; adjust based on actual XML)
    const extractedData = extractCreditData(parsedData);

    // Save to DB
    const creditReport = new CreditReport(extractedData);
    await creditReport.save();

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'File processed successfully', id: creditReport._id });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
});

app.get('/api/reports', async (req, res) => {
  try {
    const reports = await CreditReport.find().sort({ uploadedAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Function to extract credit data from parsed XML
function extractCreditData(data) {
  const report = data.INProfileResponse || {};

  // Basic Details
  const applicant =
    report.Current_Application?.Current_Application_Details?.Current_Applicant_Details || {};
  const firstName = applicant.First_Name || '';
  const lastName = applicant.Last_Name || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const mobilePhone = applicant.MobilePhoneNumber || '';
  const pan =
    report.CAIS_Account?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_ID_Details?.Income_TAX_PAN || '';

  // Credit Score
  const creditScore = report.SCORE?.BureauScore
    ? Number(report.SCORE.BureauScore)
    : 0;

  // Report Summary
  const summary = report.CAIS_Account?.CAIS_Summary || {};
  const creditAccount = summary.Credit_Account || {};
  const balance = summary.Total_Outstanding_Balance || {};

  const totalAccounts = Number(creditAccount.CreditAccountTotal || 0);
  const activeAccounts = Number(creditAccount.CreditAccountActive || 0);
  const closedAccounts = Number(creditAccount.CreditAccountClosed || 0);
  const currentBalance = Number(balance.Outstanding_Balance_All || 0);
  const securedAccountsAmount = Number(balance.Outstanding_Balance_Secured || 0);
  const unsecuredAccountsAmount = Number(balance.Outstanding_Balance_UnSecured || 0);
  const last7DaysEnquiries = Number(
    report.TotalCAPS_Summary?.TotalCAPSLast7Days || 0
  );

  // Credit Accounts
  const accountList = report.CAIS_Account?.CAIS_Account_DETAILS;
  const creditAccounts = Array.isArray(accountList)
    ? accountList.map((acc) => ({
        bank: acc.Subscriber_Name?.trim() || '',
        accountNumber: acc.Account_Number || '',
        amountOverdue: Number(acc.Amount_Past_Due || 0),
        currentBalance: Number(acc.Current_Balance || 0),
        address:
          acc.CAIS_Holder_Address_Details?.City_non_normalized ||
          acc.CAIS_Holder_Address_Details?.First_Line_Of_Address_non_normalized ||
          '',
      }))
    : [];

  return {
    name: fullName,
    mobilePhone,
    pan,
    creditScore,
    reportSummary: {
      totalAccounts,
      activeAccounts,
      closedAccounts,
      currentBalance,
      securedAccountsAmount,
      unsecuredAccountsAmount,
      last7DaysEnquiries,
    },
    creditAccounts,
  };
}

