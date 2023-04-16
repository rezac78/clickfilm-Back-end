const mongoose = require("mongoose");

const FilmSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tiTleFilm: { type: String },
  description: { type: String },
  slug: { type: String },
  tags: { type: Array },
  director: { type: String },
  actors: { type: Array },
  Mp4: { type: Object },
  cover:{ type: Object },
  coverPhone:{ type: Object },
});

module.exports = mongoose.model("Film", FilmSchema);
