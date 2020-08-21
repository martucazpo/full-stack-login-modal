const mongoose = require('mongoose');


const GamePlayerSchema = new mongoose.Schema({
    cat_id: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true,
        default: 0,
        trim: true
    },
    times_played: {
        type: Number,
        required: true,
        default: 0,
        trim: true
    },
    games_played: {
        type: Number,
        required: true,
        default: 0,
        trim: true
    },

});

module.exports = mongoose.model('GamePlayer', GamePlayerSchema);