const Background = require('../models/Background');

class BackgroundController {
  // [GET] /backgrounds?id=...
  getBackground(req, res, next) {
    Background.find()
      .then((backgrounds) => {
        const { id } = req.query;

        if (id) {
          Background.findById({ _id: req.query.id })
            .then((background) => res.status(200).json(background))
            .catch(next);
        } else {
          res.status(200).json(backgrounds);
        }
      })
      .catch(next);
  }
}

module.exports = new BackgroundController();
