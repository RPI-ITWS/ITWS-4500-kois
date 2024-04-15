import React from 'react';
import NewsFeed from './NewsFeed';
import NewsControls from './NewsControls';
import './App.css'; 

const NewsApp = () => {
  return (
    <div id="body1">
      <div className="news-ticker" id="news-ticker"></div>
      <div id="left">
        <NewsControls />
      </div>
      <div id="right">
        <NewsFeed />
      </div>
    </div>
  );
};

export default NewsApp;
