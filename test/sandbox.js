// Default logger writes at 'debug' level

require('dotenv').load();
console.log("..." + JSON.stringify(process.env))

var log = require("log");
require("log-node")();
 
// Log 'debug' level message:
log("some debug message %s", "injected string");
 
// Get namespaced logger (debug lib style)
log = log.get("my-lib");
 
// Log 'debug' level message in context of 'my-lib' namespace:
log("some debug message in 'my-lib' namespace context");
 
// Namespaces can be nested
log = log.get("func");
 
// Log 'debug' level message in context of 'my-lib:func' namespace:
log("some debug message in 'my-lib:func' namespace context");
 
// Log 'error' level message in context of 'my-lib:func' namespace:
log.error("some error message");
 
// log output can be dynamically enabled/disabled during runtime
const { restore } = log.error.disable();
log.error("error message not really logged");
// Restore previous logs visibiity state
restore();
log.error("error message to be logged");
