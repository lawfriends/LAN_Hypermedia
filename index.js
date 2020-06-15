'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 5000;

var serveStatic = require('serve-static');
let { setupDataLayer } = require("./datalayer")

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Serve the static files from public folder 
  app.use(serveStatic(__dirname + "/public"));

  // Allow whitelisted domain to pass CORS policy
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://wave.webaim.org'];
    console.log(req.headers.referer)
    var origin = req.headers.referer;
    if(allowedOrigins.indexOf(origin) > -1){
      req.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    req.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    req.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    req.setHeader('Access-Control-Allow-Credentials', true);
    return next();
  });
  

  setupDataLayer().then( () => {

  // Start the server
    http.createServer(app).listen(serverPort, function () {
      console.log('Your server is listening on port %d', serverPort);
      console.log('Swagger-ui is available on /docs or on /backend/swaggerui');
    });

  }); 

});
