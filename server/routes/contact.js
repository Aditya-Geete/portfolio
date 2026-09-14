const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const DATA_FILE = process.env.DATA_FILE
  ? path.resolve(__dirname, '..', process.env.DATA_FILE)
  : path.join(__dirname, '../data/contacts.json');

function readSubmissions() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8').trim();
  return raw ? JSON.parse(raw) : [];
}

function writeSubmissions(submissions) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
}

function isValidEmail(email) {
  // Simple, deliberately permissive check: must contain "@" and a "." after it.
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// B5: GET /api/contact — list all stored submissions (no auth, by design — see README)
router.get('/', (req, res, next) => {
  try {
    const submissions = readSubmissions();
    res.status(200).json(submissions);
  } catch (err) {
    next(err);
  }
});

// B4: POST /api/contact — validate + persist a new submission
router.post('/', (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!email || !String(email).trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const submissions = readSubmissions();
    const newSubmission = {
      id: Date.now().toString(),
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      submittedAt: new Date().toISOString(),
    };

    submissions.push(newSubmission);
    writeSubmissions(submissions);

    res.status(201).json({
      message: 'Thank you! Your message has been received.',
      submission: newSubmission,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
