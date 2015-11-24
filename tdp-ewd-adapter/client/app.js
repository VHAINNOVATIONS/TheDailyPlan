var client = require('ewdliteclient');
var args = {
    host: '54.158.47.205', // ip address / domain name of EWD.js server
    port: 8080, // port on which EWD.js server is listening
    ssl: false, // true if EWD.js server is set up for HTTPS / SSL access
    appName: 'VistARestServer', // the application name of the EWD.js Web Service you want to use
    serviceName: 'parse', // the EWD.js service name (function) you wish to invoke
    // for the specified application
    params: {
        // query string name/value pairs
        accessId: 'RESTServer', // required by EWD.js's security
        sessid: 2724 // Session Id (required by the application/service you’re invoking)
    },
    secretKey: 'TakeARest!' // the secretKey for the specified accessId
        // this must be registered on the EWD.js system
};
client.run(args, function (error, data) {
    // do whatever you need to do with the returned JSON data, eg:
    if (error) {
        console.log('An error occurred: ' + JSON.stringify(error));
    } else {
        console.log('Data returned by web service: ' + JSON.stringify(data));
    }
});
