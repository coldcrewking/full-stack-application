const router = require('express').Router();
const multer  = require('multer')
let Input = require('../models/input.model');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/public/uploads/")
    }, filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

router.route('/').get((req, res) => {
    Input.find()
      .then(inputs => res.json(inputs))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.post("/add", upload.single("imageFile"), (req, res) => {
    const newInput = new Input({
        title: req.body.title,
        content: req.body.content,
        imageFile: req.file.originalname
    });
    newInput
    .save()
    .then(() => res.json("New Inputs have been posted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Input.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
