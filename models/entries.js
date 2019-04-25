const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    distance: { type: String},
    boat:{ type: String},
    zone:{ type: Number},
    onWater:{ type: boolean },
    onLand:{ type: boolean }
},
    {timestamps: true});
const Entry = mongoose.model ('Entry', entrySchema);
module.exports = Entry;