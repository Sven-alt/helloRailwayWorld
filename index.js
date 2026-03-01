const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', version: '0.1.0' });
});

app.get('/', (req, res) => {
  const environment = process.env.ENVIRONMENT || 'development';
  res.json({
    message: 'Hello from Railway Demo!',
    environment,
  });
});

app.get('/api/example', (req, res) => {
  res.json({
    data: [
      { id: 1, name: 'Example Item 1' },
      { id: 2, name: 'Example Item 2' },
      { id: 3, name: 'Example Item 3' },
    ],
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
