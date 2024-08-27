import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QueryForm.css'; // Import the CSS file for styling

const QueryForm = () => {
  const [data, setData] = useState([]);
  const [caseId, setCaseId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all data on initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const payload = {
          query: "SELECT * FROM public.cibc_fraud_transaction_by_acct;"
        };
        const response = await axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/test`, payload); // Use the environment variable
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle case ID search
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!caseId) {
      setError("Please enter a Case ID.");
      setLoading(false);
      return;
    }

    const sqlQuery = `SELECT * FROM public.cibc_fraud_transaction_by_acct WHERE case_id_cibc = '${caseId}';`;
    console.log("SQL Query Made:", sqlQuery); // Log the SQL query

    try {
      const payload = {
        query: sqlQuery
      };
      const response = await axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/test`, payload); // Use the environment variable
      console.log("Response data:", response.data); // Log the response data

      if (response.data.length === 0) {
        setError("No data available for the specified Case ID.");
      } else {
        setData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Failed to fetch data for the specified Case ID.");
      setLoading(false);
    }
  };

  return (
    <div className="query-table-container">
      <h2>Search Fraud Transactions</h2>
      <form onSubmit={handleSearch} className="search-form">
        <label htmlFor="case_id">Case ID:</label>
        <input
          type="text"
          id="case_id"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          placeholder="Enter Case ID"
          className="case-id-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading...</div>}

      <table className="result-table">
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Case ID CIBC</th>
            <th>Event Date</th>
            <th>Result Value</th>
            <th>Device Type</th>
            <th>Device Time Zone</th>
            <th>Event Data</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.alert_id}</td>
                <td>{item.case_id_cibc}</td>
                <td>{item.event_date}</td>
                <td>{item.result_value}</td>
                <td>{item.device_type}</td>
                <td>{item.device_time_zone}</td>
                <td>{item.event_data}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueryForm;
