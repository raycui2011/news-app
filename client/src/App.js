import React, { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const dateShortcode = require('date-shortcode');
  const [appState, setAppState] = useState({
    loading: false,
    result: [],
  });
  const [foundNews, setFoundNews] = useState(appState.result);

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://localhost:3000/search`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, result: repos });
      });
  }, [setAppState]);
  
  console.log(appState.result);
  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = appState.result.filter((news) => {
        return news.webTitle.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundNews(results);
    } else {
      setFoundNews(appState.result);
    }

    setName(keyword);
  };

  return (
    <div className="container">
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Search Term"
      />

      <div className="news-list">
        <table id="customers">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Url</th>
            <th>Date</th>
          </tr>
          
        {foundNews && foundNews.length > 0 ? (
          
          foundNews.map((news) => (
          
            <tr key={news.id} className="news">
              <td>{news.id}</td>
              <td>{news.webTitle}</td>
              <td>{news.webUrl}</td>
              <td>{dateShortcode.parse('{M/D/YYYY}', news.webPublicationDate)}</td>
            </tr>
          ))
          
        ) : (
          <h1>No News found!</h1>
        )}
        
        </table>
      </div>
    </div>
  );
}

export default App;