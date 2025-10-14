import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import ReportDisplay from './components/ReportDisplay';

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

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Available Reports</h2>
          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleReportSelect(report)}
                >
                  <p><strong>Name:</strong> {report.name}</p>
                  <p><strong>Credit Score:</strong> {report.creditScore}</p>
                  <p><strong>Uploaded:</strong> {new Date(report.uploadedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reports available. Upload an XML file to get started.</p>
          )}
        </div>

        {selectedReport && <ReportDisplay report={selectedReport} />}
      </div>
    </div>
  );
};

export default App;
