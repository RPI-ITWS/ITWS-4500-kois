import express from 'express';
import mongoose from 'mongoose';
import News from './NewsModel.js'; 
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb+srv://KerryK:Kerry930039@cluster0.hw3pqet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

app.get('/db', async (req, res) => {
  try {
    const allNews = await News.find().select('title publishedAt -_id');
    res.json(allNews.map(doc => ({title: doc.title, publishedAt: doc.publishedAt})));
  } catch (error) {
    res.status(500).send(error);
  }
});
  

app.post('/db', async (req, res) => {
    try {
      const newNews = new News({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        publishedAt: req.body.publishedAt,
      });
  
      await newNews.save();
  
      res.status(201).json(newNews);
    } catch (error) {
      res.status(400).json({ message: "Error saving the news item", error: error });
    }
  });
  
app.put('/db/:title', async (req, res) => {
  const { title } = req.params;
  const updateData = req.body; 

  try {
    const updatedNews = await News.findOneAndUpdate(
      { title: title },
      updateData, 
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News item not found with title: " + title });
    }

    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: "Error updating the news item", error: error });
  }
});

app.put('/db/:title', async (req, res) => {
    const { title } = req.params; 
    const updateData = req.body; 
  
    try {
      const updatedNews = await News.findOneAndUpdate(
        { title: title }, 
        updateData, 
        { new: true } 
      );
  
      if (!updatedNews) {
        return res.status(404).json({ message: "News item not found with title: " + title });
      }
  
      res.json(updatedNews);
    } catch (error) {
      res.status(500).json({ message: "Error updating the news item", error: error });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
