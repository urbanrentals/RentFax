import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterOptions from './FilterOptions';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/customers')
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error('Error fetching customers:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleReview = (customerId) => {
    console.log(`Reviewing customer with ID: ${customerId}`);
  };

  const flaggedCustomers = customers.filter((c) => c.riskScore > 5);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto">
        <Header />

        <main className="p-6 space-y-6">
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="mt-4 md:mt-0 bg-white shadow rounded-lg px-4 py-2">
              <h4 className="text-sm text-gray-500">Total Customers</h4>
              <p className="text-xl font-semibold text-blue-600">{customers.length}</p>
            </div>
          </div>

          {/* Filters */}
          <FilterOptions />

          {/* Report Table */}
          <section className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Flagged Reports</h2>

            {loading ? (
              <p className="text-gray-500">Loading reports...</p>
            ) : flaggedCustomers.length === 0 ? (
              <p className="text-gray-500">No high-risk customers found.</p>
            ) : (
              <div className="overflow-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left px-4 py-2 border-b">Customer ID</th>
                      <th className="text-left px-4 py-2 border-b">Name</th>
                      <th className="text-left px-4 py-2 border-b">Risk Score</th>
                      <th className="text-left px-4 py-2 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flaggedCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{customer.id}</td>
                        <td className="px-4 py-2 border-b">{customer.name}</td>
                        <td className="px-4 py-2 border-b">{customer.riskScore}</td>
                        <td className="px-4 py-2 border-b">
                          <button
                            onClick={() => handleReview(customer.id)}
                            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
