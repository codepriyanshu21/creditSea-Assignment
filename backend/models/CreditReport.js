import mongoose from 'mongoose';

const creditReportSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    last7DaysEnquiries: Number,
  },
  creditAccounts: [{
    bank: String,
    accountNumber: String,
    amountOverdue: Number,
    currentBalance: Number,
    address: String,
  }],
  uploadedAt: { type: Date, default: Date.now },
});

const CreditReport = mongoose.model('CreditReport', creditReportSchema);

export default CreditReport;
