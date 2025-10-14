import React from 'react';
import { FaUser, FaCreditCard, FaChartBar, FaBuilding, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

const ReportDisplay = ({ report }) => {
  if (!report || !report.reportSummary) return null;

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-green-600 bg-green-100';
    if (score >= 650) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    return 'Poor';
  };

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-2xl mt-8 border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <FaCreditCard className="text-blue-600" />
          Credit Report
        </h2>
        <p className="text-gray-600">Comprehensive credit analysis report</p>
      </div>

      {/* Credit Score Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Credit Score</h3>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getScoreColor(report.creditScore)}`}>
              <FaChartBar className="mr-2" />
              {report.creditScore} - {getScoreLabel(report.creditScore)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Report Generated</p>
            <p className="text-lg font-semibold text-gray-700">
              {new Date(report.uploadedAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Basic Details */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaUser className="text-blue-600" />
          Basic Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Name</label>
            <p className="text-lg font-semibold text-gray-800 mt-1">{report.name || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Mobile Phone</label>
            <p className="text-lg font-semibold text-gray-800 mt-1">{report.mobilePhone || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">PAN</label>
            <p className="text-lg font-semibold text-gray-800 mt-1">{report.pan || 'N/A'}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <label className="text-sm font-medium text-blue-600 uppercase tracking-wide">Credit Score</label>
            <p className="text-2xl font-bold text-blue-800 mt-1">{report.creditScore}</p>
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaChartBar className="text-green-600" />
          Report Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Total Accounts</p>
                <p className="text-3xl font-bold text-blue-800">{report.reportSummary.totalAccounts}</p>
              </div>
              <FaCreditCard className="text-blue-500 text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 uppercase tracking-wide">Active Accounts</p>
                <p className="text-3xl font-bold text-green-800">{report.reportSummary.activeAccounts}</p>
              </div>
              <FaBuilding className="text-green-500 text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 uppercase tracking-wide">Closed Accounts</p>
                <p className="text-3xl font-bold text-red-800">{report.reportSummary.closedAccounts}</p>
              </div>
              <FaCreditCard className="text-red-500 text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 uppercase tracking-wide">Current Balance</p>
                <p className="text-2xl font-bold text-purple-800">₹{report.reportSummary.currentBalance.toLocaleString()}</p>
              </div>
              <FaRupeeSign className="text-purple-500 text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">Secured Amount</p>
                <p className="text-2xl font-bold text-indigo-800">₹{report.reportSummary.securedAccountsAmount.toLocaleString()}</p>
              </div>
              <FaRupeeSign className="text-indigo-500 text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 uppercase tracking-wide">Unsecured Amount</p>
                <p className="text-2xl font-bold text-orange-800">₹{report.reportSummary.unsecuredAccountsAmount.toLocaleString()}</p>
              </div>
              <FaRupeeSign className="text-orange-500 text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200 md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-600 uppercase tracking-wide">Last 7 Days Enquiries</p>
                <p className="text-3xl font-bold text-teal-800">{report.reportSummary.last7DaysEnquiries}</p>
              </div>
              <FaChartBar className="text-teal-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Credit Accounts Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaBuilding className="text-purple-600" />
          Credit Accounts Information
        </h3>
        {report.creditAccounts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-gray-500" />
                      Credit Card
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaBuilding className="text-gray-500" />
                      Bank
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-gray-500" />
                      Account Number
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      Address
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaRupeeSign className="text-red-500" />
                      Amount Overdue
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaRupeeSign className="text-green-500" />
                      Current Balance
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {report.creditAccounts.map((account, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {account.creditCard || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {account.bank || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {account.accountNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      {account.address || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                      ₹{account.amountOverdue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ₹{account.currentBalance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FaCreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Credit Accounts Found</h3>
            <p className="text-gray-500">This report doesn't contain any credit account information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDisplay;
