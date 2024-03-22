// NewsModel.js
import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  source: String,
  title: String,
  description: String,
  url: String,
  publishedAt: Date
});

const News = mongoose.model('News', newsSchema);

export default News;
