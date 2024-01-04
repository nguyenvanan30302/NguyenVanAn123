const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  size: { type: Number, required: true },
  views: { type: Number, default: 0 },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;

//connect db
    process.env.MONGODB_URI || "mongodb://localhost/examENJS",
    mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true });

// Import mô hình Song
const Song = require('./songModel');

app.post('/songs', async (req, res) => {
    try {
      const newSong = new Song(req.body);
      await newSong.save();
      res.json(newSong);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/songs', async (req, res) => {
    try {
      const songs = await Song.find();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/songs/:id', async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) {
        return res.status(404).json({ message: 'Không tìm thấy bài hát' });
      }
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/songs/:id', async (req, res) => {
    try {
      const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedSong) {
        return res.status(404).json({ message: 'Không tìm thấy bài hát' });
      }
      res.json(updatedSong);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete('/songs/:id', async (req, res) => {
    try {
      const deletedSong = await Song.findByIdAndDelete(req.params.id);
      if (!deletedSong) {
        return res.status(404).json({ message: 'Không tìm thấy bài hát' });
      }
      res.json({ message: 'Xóa bài hát thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });