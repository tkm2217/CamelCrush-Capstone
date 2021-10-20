const router = require('express').Router()
let Tracker = require('../models/tracker.model')

router.route('/').get((req, res) => {
    Tracker.find()
        .then(tracker => res.json(tracker))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newTracker = new Tracker({
        username,
        description,
        duration,
        date,
    });

    newTracker.save()
    .then(() => res.json('Tracker added!'))
    .catch(err => res.status(400).json ('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Tracker.findById(req.params.id)
    .then(tracker => res.json(tracker))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Tracker.findByIdandDelete(req.params.id)
    .then(tracker => res.json('Tracker deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Tracker.findById(req.params.id)
    .then(tracker => {
        tracker.username = req.body.username;
        tracker.description = req.body.description;
        tracker.duration = Number(req.body.duration);
        tracker.date = Date.parse(req.body.date);
        
        tracker.save()
            .then(() => res.json('Tracker updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;