import React, { useEffect, useState } from 'react';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const populateWeatherData = async () => {
    const response = await fetch('api/author');
    const data = await response.json();
    setLoading(false);
    setAuthors(data);
  };

  useEffect(() => {
    populateWeatherData();
  }, []);

  const renderTable = (authors) => (
    <table className="table table-striped" aria-labelledby="tableLabel">
      <thead>
        <tr>
          <th>Name</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr>
            <td>{author.name}</td>
            <td>{new Date(author.createdDateTime).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h1 id="tableLabel">Authors</h1>
      <p>This page demonstrates fetching data from the server.</p>
      <div>
        {loading ? (
          <p>
            <em>Loading...</em>
          </p>
        ) : (
          renderTable(authors)
        )}
      </div>
    </div>
  );
};

export default Authors;
