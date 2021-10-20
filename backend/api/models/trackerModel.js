import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    username: {type: String, required: true },
    description: {type: String, required: true },
    duration: {type: Number, required : true },
    date: {type: Date, required: true },
}, {
    timestamps: true,
});

const Tracker = mongoose.model('Tracker', trackerSchema);

module.exports = Tracker;