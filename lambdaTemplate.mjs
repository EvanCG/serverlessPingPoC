const outerTime = Date.now();
let firstRun = true;

export const handler = async (event) => {
  
  let innerTime = Date.now();
  
  let bodyContent = {
    formattedResponse: 'This function initially loaded at ' + new Date(outerTime) + '. This function ran at ' + new Date(innerTime) + '.',
    functionInitialLoad: outerTime,
    functionInnertime: innerTime,
    msSinceFunctionLoad: innerTime - outerTime,
    firstRun: firstRun,
  }

  firstRun = false;

  const response = {
    statusCode: 200,
    body: JSON.stringify(bodyContent),
  };
  return response;
};