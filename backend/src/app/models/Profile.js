const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Profile = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    name: { type: String, default: null },
    signature: { type: String, default: null },
    gender: { type: String, default: 'Prefer not to say' },
    phone: { type: Number, default: null },
    date: { type: Date, default: null },
    address: { type: String, default: null },
    background: { type: String, default: '66d87fdfed94cae936918fda' },
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
