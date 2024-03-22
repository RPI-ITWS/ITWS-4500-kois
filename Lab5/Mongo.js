import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import News from './NewsModel.js'; 
import fetch from 'node-fetch'; 

const mongoDBUri = process.env.MONGODB;

mongoose.connect(mongoDBUri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

async function fetchNews() {
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-02-21&sortBy=publishedAt&apiKey=a26b8f38a9e04a2cb821204b4c4a9285`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Fetching news failed:', error);
    return [];
  }
}

async function saveNews(articles) {
  for (const article of articles) {
    const news = new News({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
    });
    await news.save();
  }
  console.log(`${articles.length} articles saved.`);
}

async function loadData() {
  console.log('Fetching news articles...');
  const articles = await fetchNews();
  if (articles && articles.length) {
    console.log('Saving articles to the database...');
    await saveNews(articles);
  } else {
    console.log('No articles fetched.');
  }
  await mongoose.disconnect();
}

loadData().catch(console.error);

