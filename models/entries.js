const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    date:{type:String},
    description:{ type: String},
    distance: { type: Number},
    boat:{ type: String},
    zone:{ type: Number},
    onWater:{ type: Boolean },
    onLand:{ type: Boolean }
},
    {timestamps: true});
const Entry = mongoose.model ('Entry', entrySchema);
module.exports = Entry;