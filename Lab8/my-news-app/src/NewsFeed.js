import React, { useState, useEffect, useCallback } from 'react';

const NewsFeed = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const newsPerPage = 5;
  const totalPage = 21; 

  const fetchNews = useCallback(() => {
    fetch(`/api/articles?page=${currentPage}&pageSize=${newsPerPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setNewsData(data || []);
      })
      .catch(error => console.error('Error fetching news data:', error));
  }, [currentPage, newsPerPage]);

  useEffect(() => {
    fetchNews();
  }, [currentPage, fetchNews]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTickerIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [newsData.length]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage));
  };


  const pageArticles = newsData.slice(
    (currentPage - 1) * newsPerPage,
    currentPage * newsPerPage
  );

  const tickerArticle = newsData[currentTickerIndex];

  return (
    <div>
      <div class="news-ticker">
        {tickerArticle && (
          <p>{tickerArticle.title}</p>
        )}
      </div>
      <div id="news-container">
        {pageArticles.map((article, index) => (
          <div key={index} className="news-item">
            <p>ID: {article.source?.id || "Unknown ID"}</p>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePrevClick} className="pagination-button" disabled={currentPage === 1}>Prev</button>
        <button onClick={handleNextClick} className="pagination-button" disabled={currentPage === totalPage}>Next</button>
      </div>
    </div>
  );
};

export default NewsFeed;
