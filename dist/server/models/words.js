"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var wordSchema = new mongoose.Schema({
    _id: Number,
    word: String
});
var Word = mongoose.model('Word', wordSchema);
exports.default = Word;
//# sourceMappingURL=words.js.map