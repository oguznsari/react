require('dotenv').config();

const Article = require('./models/Article');
const connectDB = require('./db/connect');

let articlesInfo = [
    {
        name: "learn-react",
        upvotes: 0,
        comments: []
    },
    {
        name: "learn-node",
        upvotes: 0,
        comments: []
    },
    {
        name: "mongodb",
        upvotes: 0,
        comments: []
    }
];

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Article.create(articlesInfo);
        console.log('Success !!!');
        process.exit(0);
    } catch (error) {
        console.log({ error });
        process.exit(1);
    }
}

start()