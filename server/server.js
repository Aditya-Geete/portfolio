require('dotenv').config();

const express = require('express');
const cors = require('cors');

const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// B1: Health check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// B2 + B3
app.use('/api/projects', projectsRouter);

// B4 + B5
app.use('/api/contact', contactRouter);

// B6: 404 for any undefined route, then global error handler.
// These must be registered last, in this order.
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Portfolio backend running at http://localhost:${PORT}`);
});
