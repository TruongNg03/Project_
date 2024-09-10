const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, require: true, unique: true }, // email
    password: { type: String, require: true },
    passwordUnHash: { type: String, require: true },
    name: { type: String, default: null },
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

//
User.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'asc',
    });
  }

  return this;
};

User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('User', User);
