const path = require('path');
const express = require('express');

const initializeJobs = require('./runJobs.js');

const app = express();
const port = process.env.PORT || 3000;

// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

/* Catch-all route handler */
app.use((req, res) => res.status(404).send('This page can\'t be found'));



/* Global error hander */
app.use((err, req, res, next) => {
  console.log('----> We are in the global error handler <----');
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

initializeJobs();

module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}: http://localhost:${port}/`)
);