const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });


const quoteSchema = new mongoose.Schema({
  id: Number,
  author: String,
  quote: String
});
const Quote = mongoose.model('Quote', quoteSchema);

async function fetchFromQuoteGarden() {
  try {
    const response = await axios.get('https://prathameshmore.online/QuoteGarden/');
    const quotes = response.data.quotes; 
    quotes.forEach(async quote => {
      await Quote.create({ id: ++currentId, author: quote.author, quote: quote.quoteText });
    });
  } catch (error) {
    console.error('Error fetching from Quote Garden:', error);
  }
}

async function fetchFromQuotesOnDesign() {
  try {
    const response = await axios.get('https://quotesondesign.com/api/v4/quotes/');
    const quotes = response.data; 
    quotes.forEach(async quote => {
      await Quote.create({ id: ++currentId, author: quote.author, quote: quote.content });
    });
  } catch (error) {
    console.error('Error fetching from Quotes on Design:', error);
  }
}

/**
async function fetchFromForismatic() {
  try {
    const response = await axios.get('https://forismatic.com/en/api/');
    const quote = response.data.quote; 
    await Quote.create({ id: ++currentId, author: quote.author, quote: quote.quoteText });
  } catch (error) {
    console.error('Error fetching from Forismatic:', error);
  }
}
 */
function runETLPipeline() {
  Promise.all([
    fetchFromQuoteGarden(),
    fetchFromQuotesOnDesign(),
    //fetchFromForismatic()
  ]).then(() => {
    console.log('ETL pipeline executed successfully');
    mongoose.disconnect();
  });
}

runETLPipeline();
