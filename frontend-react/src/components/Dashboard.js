import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterOptions from "../components/FilterOptions";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const handleReview = (customerId) => {
    console.log(`Reviewing customer with ID: ${customerId}`);
  };
return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <div className="stats">
              <div className="stat-item">
                <h4>Total Customers</h4>
                <p>{customers.length}</p>
              </div>
            </div>
          </div>

        <FilterOptions />

          <div className="report-table">
            <h2>Flagged Reports</h2>
            {loading ? (
              <p>Loading reports...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Risk Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.filter(c => c.riskScore > 5).map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.riskScore}</td>
                      <td><button onClick={() => handleReview(c.id)}>Review</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
