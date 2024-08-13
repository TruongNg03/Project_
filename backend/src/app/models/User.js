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
    name: { type: String, require: true },
    identity: { type: Number, require: true, unique: true },
    phone: { type: Number },
    date: { type: Date },
    // type
    admin: { type: Boolean, default: false },
    employee: { type: Boolean, default: false },
    user: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', User);
