import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiResponse {
  error: boolean;
  errorMsg: string;
  data: any; // Replace 'any' with the actual type of your JSON data
}

function App() {
  const [responseData, setResponseData] = useState<ApiResponse>({ error: false, errorMsg: '', data: null });

  useEffect(() => {
    // Define the API URL
    const apiUrl = 'http://127.0.0.1:3000/load/dataJson';

    // Make the GET request to the API using Axios
    axios.get(apiUrl)
      .then((response) => {
        const data = response.data;
        setResponseData({ error: false, errorMsg: '', data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setResponseData({ error: true, errorMsg: 'Error fetching data', data: null });
      });
  }, []);

  return (
    <div className="App">
      <h1>API Response Data:</h1>
      {responseData.error ? (
        <p>Error: {responseData.errorMsg}</p>
      ) : (
        <>
          {responseData.data ? (
            <pre>Advert ID 1: {JSON.stringify(responseData.data.data.data[0].adverts_id, null, 2)}</pre>
          ) : (
            <p>No data available for Advert ID</p>
          )}
          {responseData.data ? (
            <pre>Advert Name: {JSON.stringify(responseData.data.data.data[0].adverts_name, null, 2)}</pre>
          ) : (
            <p>No data available for Advert Name</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
