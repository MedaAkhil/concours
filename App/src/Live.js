import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function Live() {
  const [data, setData] = useState([]);
  const [domainCounts, setDomainCounts] = useState({}); // To store problem count for each domain

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
        updateDomainCounts(result); // Update domain counts after fetching data
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();

    // Socket listener for changes
    socket.on('dataChanged', (change) => {
      let updatedData = [...data];
      if (change.operationType === 'insert') {
        updatedData.push(change.fullDocument);
      } else if (change.operationType === 'update') {
        updatedData = updatedData.map((item) =>
          item._id === change.documentKey._id ? { ...item, ...change.updateDescription.updatedFields } : item
        );
      } else if (change.operationType === 'delete') {
        updatedData = updatedData.filter((item) => item._id !== change.documentKey._id);
      }

      setData(updatedData);
      updateDomainCounts(updatedData); // Update domain counts after data changes
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [data]);

  // Function to update domain counts based on current data
  const updateDomainCounts = (items) => {
    const counts = items.reduce((acc, item) => {
      acc[item.domain] = acc[item.domain] ? acc[item.domain] + 1 : 1;
      return acc;
    }, {});
    setDomainCounts(counts);
  };

  return (
    <div className='liveMainDiv'>
      <h1>Team Count: {data.length}</h1>
      {/* <p>Count: {data.length}</p> */}

      <h2>Problem Counts by Domain</h2>
      <ul className='DomainCountDisplayul'>
        {Object.keys(domainCounts).map((domain) => (
          <li className='DomainCountDisplayli' key={domain}>
            {domain}: {domainCounts[domain]} problems
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Live;
