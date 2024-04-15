import React, { useState } from 'react';

const NewsControls = () => {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleDescription, setArticleDescription] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      title: articleTitle,
      description: articleDescription,
    };

    fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Article added:', data);
      setArticleTitle('');
      setArticleDescription('');
    })
    .catch((error) => {
      console.error('Error adding article:', error);
    });
  };

  const handleSearch = () => {
    fetch(`/api/articles?title=${encodeURIComponent(searchTitle)}`)
    .then(response => response.json())
    .then(data => {
      console.log('Search results:', data);
    })
    .catch((error) => {
      console.error('Error searching articles:', error);
    });
  };


  return (
    <div>
      <form id="addArticleForm" onSubmit={handleArticleSubmit}>
        <input 
          type="text" 
          id="articleTitle" 
          placeholder="Title" 
          required
          value={articleTitle}
          onChange={e => setArticleTitle(e.target.value)}
        />
        <textarea 
          id="articleDescription" 
          placeholder="Description" 
          required
          value={articleDescription}
          onChange={e => setArticleDescription(e.target.value)}
        />
        <button type="submit">Add Article</button>
      </form>
      <input 
        type="text" 
        id="searchTitle" 
        placeholder="Enter news title"
        value={searchTitle}
        onChange={e => setSearchTitle(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div id="searchResults">
      </div>
    </div>
  );
};

export default NewsControls;
