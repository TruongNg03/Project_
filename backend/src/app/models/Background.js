const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Background = new Schema(
  {
    imageUrl: { type: String, require: true },
    slug: { type: String, slug: 'image', unique: true },
  },
  {
    timestamps: true,
  },
);

// add plugin
mongoose.plugin(slug);
Background.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Background', Background);
