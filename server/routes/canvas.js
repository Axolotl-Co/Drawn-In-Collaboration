const express = require('express');
const router = express.Router();
const canvasController = require('../controllers/canvasController');

router.post('/', canvasController.createCanvas);
router.get('/:id', canvasController.getCanvas);
router.put('/:id', canvasController.updateCanvas);
router.delete('/:id', canvasController.deleteCanvas);

module.exports = router;