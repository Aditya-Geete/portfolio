const express = require('express');
const router = express.Router();
const projects = require('../data/projects');

// B2: GET /api/projects
router.get('/', (req, res) => {
  res.status(200).json(projects);
});

// B3: GET /api/projects/:id
router.get('/:id', (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.status(200).json(project);
});

module.exports = router;
