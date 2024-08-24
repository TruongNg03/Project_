const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Hospital = new Schema(
  {
    name: { type: String, require: true },
    address: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);

// custom query helpers
// Hospital.query.sortable = function (req) {
//   if (req.query.hasOwnProperty('_sort')) {
//     const isValidType = ['asc', 'desc'].includes(req.query.type);
//     return this.sort({
//       [req.query.column]: isValidType ? req.query.type : 'asc',
//     });
//   }

//   return this;
// };

// add plugin
mongoose.plugin(slug);
Hospital.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Hospital', Hospital);
