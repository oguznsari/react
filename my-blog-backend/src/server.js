import express from "express";

const app = express();
app.use(express.json());

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const artilce = articlesInfo.find(a => a.name === name);

    if (artilce) {
        artilce.upvotes += 1;
        res.send(`The ${name} article now has ${artilce.upvotes} upvotes!!!`)
    } else {
        res.send('That article doesn\'t exists.');
    }
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const article = articlesInfo.find(a => a.name === name);

    if (article) {
        article.comments.push({ postedBy, text });
        res.send(article.comments);
    } else {
        res.send('That article doesn\'t exists.');
    }
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000...')
})