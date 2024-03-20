// Imports
const schedule = require('node-schedule');
const { Pool } = require('pg');
require('dotenv').config();

// establish connection to the database
const pool = new Pool({
  connectionString: process.env.PG_URL,
  max: 4,
});

/**
 *
 * Given a URL, record the time of invocation, the start time, the end time of the server function.
 *
 * @param {string} endpoint : And object with { name, url }. Name is recorded as a recognizable name in the DB, while url is the function endpoint
 * @param {number} invokeTime : the time in miliseconds that this function was invoked
 */
const callAndLog = async (endpoint, invokeTime) => {
  try {
    // create a variable for starting time in ms, serverStart
    let serverStart = Date.now();
    // make a fetch for endpoint.url
    let response = await fetch(endpoint.url);

    // create a variable for return time in ms, serverEnd
    let serverEnd = Date.now();
    // declare variable serverDifference = serverEnd - serverStart
    let serverDifference = serverEnd - serverStart;

    // parse the fetch results
    let result = await response.json();

    // make an async request to write these results to the DB:

    const SQL = `
      INSERT INTO logs ("name", "url", "invokeTime", "formattedResponse", "functionInitialLoad", "functionInnertime", "msSinceFunctionLoad", "firstRun", "serverStart", "serverEnd", "serverDifference")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const params = [
      endpoint.name,
      endpoint.url,
      invokeTime,
      result.formattedResponse,
      result.functionInitialLoad,
      result.functionInnertime,
      result.msSinceFunctionLoad,
      result.firstRun,
      serverStart,
      serverEnd,
      serverDifference,
    ];

    const insertion = await pool.query(SQL, params);

    //console log result.formattedResponse & inserted row
    console.log(
      `Called ${endpoint.name} at an invoke time of ${new Date(
        invokeTime
      ).toString()}`
    );

  } catch (err) {
    console.log('Hit an error: ', err);
  }
};

/**
 * Set up schedules for lambdas that run...
 *
 * Every...10s, 1m, 5m, 15m, 30m, 1hr, 2hr, 3hr, 4hr, 5hr
 */

const endpoint10S = {
  url: process.env.URL_10S,
  name: '1. Every 10 Seconds',
};

const endpoint1M = {
  url: process.env.URL_1M,
  name: '2. Every 1 Minute',
};

const endpoint5M = {
  url: process.env.URL_5M,
  name: '3. Every 5 Minutes',
};

const endpoint15M = {
  url: process.env.URL_15M,
  name: '4. Every 15 Minutes',
};

const endpoint30M = {
  url: process.env.URL_30M,
  name: '5. Every 30 Minutes',
};

const endpoint1H = {
  url: process.env.URL_1H,
  name: '6. Every 1 Hour',
};

const endpoint2H = {
  url: process.env.URL_2H,
  name: '7. Every 2 Hour',
};

const endpoint3H = {
  url: process.env.URL_3H,
  name: '8. Every 3 Hour',
};

/* Run the jobs */
const job10S = schedule.scheduleJob('*/10 * * * * *', () =>
  callAndLog(endpoint10S, Date.now())
);
const job1M = schedule.scheduleJob('0 */1 * * * *', () =>
  callAndLog(endpoint1M, Date.now())
);
const job5M = schedule.scheduleJob('0 */5 * * * *', () =>
  callAndLog(endpoint5M, Date.now())
);
const job15M = schedule.scheduleJob('0 */15 * * * *', () =>
  callAndLog(endpoint15M, Date.now())
);
const job30M = schedule.scheduleJob('0 */30 * * * *', () =>
  callAndLog(endpoint30M, Date.now())
);
const job1H = schedule.scheduleJob('0 0 */1 * * *', () =>
  callAndLog(endpoint1H, Date.now())
);
const job2H = schedule.scheduleJob('0 0 */2 * * *', () =>
  callAndLog(endpoint2H, Date.now())
);
const job3H = schedule.scheduleJob('0 0 */3 * * *', () =>
  callAndLog(endpoint3H, Date.now())
);