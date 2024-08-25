const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Profile = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    name: { type: String, default: null },
    phone: { type: Number, default: null },
    date: { type: Date, default: null },
    address: { type: String, default: null },
    title: { type: String, default: null },
    background: { type: String, default: 'backgroundProfile' },
    idActivity: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

Profile.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Profile', Profile);
