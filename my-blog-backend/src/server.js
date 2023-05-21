const fs = require('fs');
const admin = require('firebase-admin');
const express = require("express");
const dotenv = require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

const app = express();
app.use(express.json());
const connectDB = require('../db/connect');
const Article = require('../models/Article');

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    await connectDB(process.env.MONGO_URI);

    const article = await Article.findOne({ name });
    if (article) {
        res.status(StatusCodes.OK).json({ article });
    } else {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No article found with the name: ${name}` })
    }
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    await connectDB(process.env.MONGO_URI);

    const article = await Article.findOne({ name });
    if (article) {
        article.upvotes += 1;
        article.save();
        res.send(article)
    } else {
        res.send('That article doesn\'t exists.');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    await connectDB(process.env.MONGO_URI);

    const article = await Article.findOne({ name });

    if (article) {
        article.comments.push({ postedBy, text });
        article.save();
        res.json(article);
    } else {
        res.send('That article doesn\'t exists.');
    }
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000...')
})