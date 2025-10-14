import CreditReport from '../models/CreditReport.js';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';

const parser = new XMLParser();

function extractCreditData(data) {
  const profile = data.INProfileResponse || {};

  // Basic details
  const applicant = profile.Current_Application?.Current_Application_Details?.Current_Applicant_Details || {};
  const summary = profile.CAIS_Account?.CAIS_Summary || {};
  const totalOutstanding = summary.Total_Outstanding_Balance || {};
  const creditSummary = summary.Credit_Account || {};
  const score = profile.SCORE?.BureauScore || 0;

  // Credit accounts list
  let accounts = profile.CAIS_Account?.CAIS_Account_DETAILS;
  if (accounts && !Array.isArray(accounts)) {
    accounts = [accounts];
  }

  const creditAccounts = accounts?.map((acc) => ({
    creditCard: acc.Account_Type === '10' ? 'Credit Card' : 'Other',
    bank: acc.Subscriber_Name?.trim() || '',
    accountNumber: acc.Account_Number || '',
    address: acc.CAIS_Holder_Address_Details?.First_Line_Of_Address_non_normalized || '',
    amountOverdue: acc.Amount_Past_Due || 0,
    currentBalance: acc.Current_Balance || 0,
  })) || [];

  return {
    name: `${applicant.First_Name || ''} ${applicant.Last_Name || ''}`.trim(),
    mobilePhone: applicant.MobilePhoneNumber || '',
    pan: profile.CAIS_Account?.CAIS_Account_DETAILS?.CAIS_Holder_Details?.Income_TAX_PAN || '',
    creditScore: score,
    reportSummary: {
      totalAccounts: creditSummary.CreditAccountTotal || 0,
      activeAccounts: creditSummary.CreditAccountActive || 0,
      closedAccounts: creditSummary.CreditAccountClosed || 0,
      currentBalance: totalOutstanding.Outstanding_Balance_All || 0,
      securedAccountsAmount: totalOutstanding.Outstanding_Balance_Secured || 0,
      unsecuredAccountsAmount: totalOutstanding.Outstanding_Balance_UnSecured || 0,
      last7DaysEnquiries: profile.TotalCAPS_Summary?.TotalCAPSLast7Days || 0,
    },
    creditAccounts,
  };
}


export const uploadCreditReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read and parse XML
    const xmlData = fs.readFileSync(req.file.path, 'utf8');
    const parsedData = parser.parse(xmlData);

    // Extract data
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
};

export const getCreditReports = async (req, res) => {
  try {
    const reports = await CreditReport.find().sort({ uploadedAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
};
