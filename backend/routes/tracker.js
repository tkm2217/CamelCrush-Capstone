import express from 'express'
const router = express.Router()

import Tracker from '../../api/models/trackerModel.js'

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

export default router