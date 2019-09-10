import mongoose from 'mongoose';

//set blog post schema
const Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        max: 200
    },
    createdDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    lastModifiedDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    content: {
        type: String
    }
})

module.exports = mongoose.model('Post', Schema);