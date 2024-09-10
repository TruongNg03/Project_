const Blood = require('../models/Blood');

class BloodController {
  create(req, res, next) {
    res.render('bloods/create');
  }

  // [GET] /bloods/stored
  getBlood(req, res, next) {
    Blood.findById({ _id: req.params.id })
      .then((bloods) => res.status(200).json(bloods))
      .catch(next);
  }

  // [POST] /bloods/stored
  store(req, res, next) {
    const bloods = new Blood(req.body);
    bloods
      .save()
      .then(() => res.status(200).json({ message: 'created!' }))
      .catch(next);
  }

  // [PUT] /bloods/:id/edit
  edit(req, res, next) {
    Blood.updateOne({ _id: req.params.id }, req.body)
      .lean()
      .then(() => res.status(200).json({ message: 'created!' }))
      .catch(next);
  }

  // [DELETE] /bloods/:id
  destroy(req, res, next) {
    Blood.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'deleted force bloods!' }))
      .catch(next);
  }
}

module.exports = new BloodController();
