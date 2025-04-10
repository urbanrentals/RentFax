import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await axios.get('http://localhost:5000/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    }

    fetchReports();
  }, []);

  return (
    <div>
      <h1>Flagged Reports</h1>
      <ul>
        {reports.filter(report => report.status === 'Flagged').map(report => (
          <li key={report._id}>
            User ID: {report.userId}, Fraud Risk Score: {report.fraudRiskScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
