import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import ReportDisplay from './components/ReportDisplay';
import { FaFileAlt, FaCreditCard, FaBuilding, FaCalendarAlt, FaEye, FaCloudUploadAlt } from 'react-icons/fa';

const App = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleUploadSuccess = async (id) => {
    await fetchReports(); // Refresh the list
    // Find and select the newly uploaded report
    const updatedReports = await fetch('http://localhost:5000/api/reports').then(res => res.json());
    const newReport = updatedReports.find(r => r._id === id);
    if (newReport) {
      setSelectedReport(newReport);
    }
  };

  const handleReportSelect = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">CreditSea Credit Report Processor</h1>

        <UploadForm onUploadSuccess={handleUploadSuccess} />

        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <FaFileAlt className="text-green-600" />
              Available Reports
            </h2>
            <p className="text-gray-600">Select a report to view detailed analysis</p>
          </div>

          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4 transform hover:-translate-y-1 ${
                    selectedReport && selectedReport._id === report._id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-400'
                  }`}
                  onClick={() => handleReportSelect(report)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {report.name || 'Unknown User'}
                      </h3>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        report.creditScore >= 750 ? 'bg-green-100 text-green-800' :
                        report.creditScore >= 650 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Score: {report.creditScore}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`w-3 h-3 rounded-full ${
                        selectedReport && selectedReport._id === report._id ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-gray-400" />
                      <span>{report.reportSummary?.totalAccounts || 0} Accounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBuilding className="text-gray-400" />
                      <span>{report.reportSummary?.activeAccounts || 0} Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{new Date(report.uploadedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}</span>
                    </div>
                  </div>

                  {selectedReport && selectedReport._id === report._id && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                        <FaEye className="text-blue-500" />
                        Currently Viewing
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <FaFileAlt className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Available</h3>
              <p className="text-gray-500 mb-6">Upload an XML file above to generate your first credit report</p>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <FaCloudUploadAlt className="text-blue-600" />
                Get started by uploading a file
              </div>
            </div>
          )}
        </div>

        {selectedReport && <ReportDisplay report={selectedReport} />}
      </div>
    </div>
  );
};

export default App;
