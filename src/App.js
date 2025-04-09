import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FilterOptions from './components/FilterOptions';
import ReportSubmissionForm from './components/ReportSubmissionForm';
import PaymentSuccess from './Pages/PaymentSuccess';
import PaymentCancel from './Pages/PaymentCancel';
import './index.css';

function Dashboard() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/customers")
            .then(response => {
                setCustomers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
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
                                    {customers.filter(customer => customer.riskScore > 5).map((customer) => (
                                        <tr key={customer.id}>
                                            <td>{customer.id}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.riskScore}</td>
                                            <td>
                                                <button onClick={() => handleReview(customer.id)}>Review</button>
                                            </td>
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
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/submit-report" element={<ReportSubmissionForm />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-cancel" element={<PaymentCancel />} />
            </Routes>
        </Router>
    );
}

export default App;
