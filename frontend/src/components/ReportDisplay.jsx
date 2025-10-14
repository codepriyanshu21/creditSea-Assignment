import React from 'react';

const ReportDisplay = ({ report }) => {
  if (!report || !report.reportSummary) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6">Credit Report</h2>

      {/* Basic Details */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Basic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Name:</strong> {report.name}</div>
          <div><strong>Mobile Phone:</strong> {report.mobilePhone}</div>
          <div><strong>PAN:</strong> {report.pan}</div>
          <div><strong>Credit Score:</strong> {report.creditScore}</div>
        </div>
      </section>

      {/* Report Summary */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Report Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Total Accounts:</strong> {report.reportSummary.totalAccounts}</div>
          <div><strong>Active Accounts:</strong> {report.reportSummary.activeAccounts}</div>
          <div><strong>Closed Accounts:</strong> {report.reportSummary.closedAccounts}</div>
          <div><strong>Current Balance:</strong> ₹{report.reportSummary.currentBalance}</div>
          <div><strong>Secured Accounts Amount:</strong> ₹{report.reportSummary.securedAccountsAmount}</div>
          <div><strong>Unsecured Accounts Amount:</strong> ₹{report.reportSummary.unsecuredAccountsAmount}</div>
          <div><strong>Last 7 Days Enquiries:</strong> {report.reportSummary.last7DaysEnquiries}</div>
        </div>
      </section>

      {/* Credit Accounts Information */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Credit Accounts Information</h3>
        {report.creditAccounts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Credit Card</th>
                  <th className="border border-gray-300 px-4 py-2">Bank</th>
                  <th className="border border-gray-300 px-4 py-2">Address</th>
                  <th className="border border-gray-300 px-4 py-2">Account Number</th>
                  <th className="border border-gray-300 px-4 py-2">Amount Overdue</th>
                  <th className="border border-gray-300 px-4 py-2">Current Balance</th>
                </tr>
              </thead>
              <tbody>
                {report.creditAccounts.map((account, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{account.creditCard}</td>
                    <td className="border border-gray-300 px-4 py-2">{account.bank}</td>
                    <td className="border border-gray-300 px-4 py-2">{account.address}</td>
                    <td className="border border-gray-300 px-4 py-2">{account.accountNumber}</td>
                    <td className="border border-gray-300 px-4 py-2">₹{account.amountOverdue}</td>
                    <td className="border border-gray-300 px-4 py-2">₹{account.currentBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No credit accounts found.</p>
        )}
      </section>
    </div>
  );
};

export default ReportDisplay;
