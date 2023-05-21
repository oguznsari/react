const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50
        },
        upvotes: {
            type: Number,
            default: 0
        },
        comments: {
            type: [Object]
        }
    }
);


module.exports = mongoose.model('Article', ArticleSchema)