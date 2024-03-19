// Imports
const schedule = require('node-schedule');
const { Pool } = require('pg');
require('dotenv').config()

// establish connection to the database

console.log('The secret is: ', process.env.TEST_SECRET);

/**
 * 
 * Given a URL, record the time of invocation, the start time, the end time of the server function.
 * 
 * @param {string} endpoint : And object with { name, url }. Name is recorded as a recognizable name in the DB, while url is the function endpoint
 * @param {number} invokeTime : the time in miliseconds that this function was invoked
 */
const callAndLog = async (endpoint, invokeTime) => {

  // create a variable for starting time in ms, serverStart
  // make a fetch for endpoint.url
  // create a variable for return time in ms, serverEnd

  // declare variable serverDifference = serverEnd - serverStart
  
  // parse the fetch results

  // make an async request to write these results to the DB:

    // endpoint.name
    // endpoint.url
    // invokeTime
    // result.formattedResponse
    // result.functionInitialLoad
    // result.functionInnertime
    // result.msSinceFunctionLoad
    // result.firstRun
    // serverStart
    // serverEnd
    // serverDifference

  //console log result.formattedResponse
}

/**
 * Set up schedules for lambdas that run...
 * 
 * Every...10s, 1m, 5m, 15m, 30m, 1hr, 2hr, 3hr, 4hr, 5hr
 */