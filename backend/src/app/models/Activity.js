const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Activity = new Schema(
  {
    hospital: { type: String, require: true },
    title: { type: String, require: true },
    locate: { type: String, require: true },
    timeActive: { type: String },
    timeStart: { type: String },
    amount: { type: String, require: true },
    max: { type: String, require: true },
    slug: { type: String, slug: 'title', unique: true },
  },
  {
    timestamps: true,
  },
);

// custom query helpers
Activity.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'asc',
    });
  }

  return this;
};

// add plugin
mongoose.plugin(slug);
Activity.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Activity', Activity);
