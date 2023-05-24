const mongoose = require('mongoose');

let client;

export const initializeDbConnection = async (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}