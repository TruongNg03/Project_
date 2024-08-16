const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    name: { type: String, default: '' },
    identity: { type: Number, require: true, unique: true },
    phone: { type: Number, default: null },
    date: { type: Date, default: null },
    // type
    admin: { type: Boolean, default: false },
    employee: { type: Boolean, default: false },
    user: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('User', User);
