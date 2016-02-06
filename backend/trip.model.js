"use strict";
let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;
let TripSchema = new Schema({name:String,price:Number,description:String})

module.exports = mongoose.model('Trip', TripSchema);
