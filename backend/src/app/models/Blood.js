const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Blood = new Schema(
  {
    name: { type: String, require: true },
    identity: { type: Number, require: true, unique: true },
    blood_group: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);

// add plugin
Blood.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Blood', Blood);
