"use strict";

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Trip = require('./trip.model');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// connect to my database
mongoose.connect('mongodb://localhost:27017/takemetour');

let router = express.Router();

router.use((req, res, next) => {
  // do logging
  console.log('Someone request data');
  next();
});

router.route('/trips')
  .post((req, res) => {
    let trip = new Trip();
    if (!req.body.name) {
      res.json({
        msg: "errer no name"
      })
      return;
    }
    trip.name = req.body.name;
    trip.description = req.body.description;
    trip.price = req.body.price;
    let promise = trip.save();
    promise.then((doc) => {
      if (!doc) {
        //error occur here
        res.json({
          msg: "error"
        })
      } else {
        res.json({
          msg: "insert complete!",
          data: doc
        })
      }

    })
  })

.get((req, res) => {
  let promise = Trip.find({}, {
    name: 1
  });
  promise.then((doc) => {
    res.json(doc)
  })
})

router.route('/trip/:id')
  .get((req, res) => {
    Trip.findById(req.params.id).then(
      (doc) => {
        res.json(doc);
      }
    )
  })
  .put((req, res) => {
    Trip.findOne(req.params.id).then(
      (trip) => {
        trip.name = req.body.name;
        trip.description = req.body.description;
        trip.price = req.body.price;
        trip.save((err) => {
          if (err)
            res.json({
              msg: err.toString()
            })

          res.json({
            msg: 'updated!',
            data: trip
          })
        })

      }
    )
  })
  .delete((req, res) => {
    //do lazy expression style no promise
    Trip.remove({
      _id: req.params.id
    }, (err, trip) => {
      if (err)
        res.send(err);

      res.json({
        data:trip,
        msg: 'Successfully deleted'
      });

    })
  })

router.get('/', (req, res) => {
  res.json({
    message: 'Hi, nothing here.'
  });
});

app.use('/api', router);

app.listen(1234, () => {
  console.log('API listening on port 1234!');
});
