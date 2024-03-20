CREATE TABLE public.logs (
  "log_id" serial PRIMARY KEY
  , "name" varchar
  , "url" varchar
  , "invokeTime" bigint
  , "formattedResponse" varchar
  , "functionInitialLoad" bigint
  , "functionInnertime" bigint
  , "msSinceFunctionLoad" bigint
  , "firstRun" boolean
  , "serverStart" bigint
  , "serverEnd" bigint
  , "serverDifference" bigint
) WITH (
  OIDS=FALSE
);