const Canvas = require('../models/Canvas');

// Create a new canvas
exports.createCanvas = async (req, res) => {
  const { user, elements } = req.body;

  try {
    const canvas = new Canvas({ user, elements });
    await canvas.save();

    res.status(201).json(canvas);
  } catch (error) {
    res.status(500).json({ error: 'Error creating canvas' });
  }
};

// Get a canvas by ID
exports.getCanvas = async (req, res) => {
  const { id } = req.params;

  try {
    const canvas = await Canvas.findById(id);

    if (!canvas) {
      return res.status(404).json({ error: 'Canvas not found' });
    }

    res.json(canvas);
  } catch (error) {
    res.status(500).json({ error: 'Error getting canvas' });
  }
};

// Update a canvas by ID
exports.updateCanvas = async (req, res) => {
  const { id } = req.params;
  const { elements } = req.body;

  try {
    const canvas = await Canvas.findByIdAndUpdate(id, { elements }, { new: true });

    if (!canvas) {
      return res.status(404).json({ error: 'Canvas not found' });
    }

    res.json(canvas);
  } catch (error) {
    res.status(500).json({ error: 'Error updating canvas' });
  }
};

// Delete a canvas by ID
exports.deleteCanvas = async (req, res) => {
  const { id } = req.params;

  try {
    const canvas = await Canvas.findByIdAndDelete(id);

    if (!canvas) {
      return res.status(404).json({ error: 'Canvas not found' });
    }

    res.json({ message: 'Canvas deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting canvas' });
  }
};