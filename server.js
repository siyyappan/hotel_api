const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var argv = require('minimist')(process.argv.slice(2));
var cors = require('cors');

//CORS
app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

// SWAGGER
var subpath = express();
app.use(
    bodyParser.json({
        limit: '50mb'
    })
);
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    })
);
app.use('', subpath);
var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('swagger'));
swagger.setApiInfo({
    title: 'Hotel API',
    description: 'Hotel API Description',
    termsOfServiceUrl: '',
    contact: '<your email here>',
    license: '',
    licenseUrl: ''
});
// Set api-doc path
swagger.setAppHandler(app);
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = 'localhost';
if (argv.domain !== undefined) domain = argv.domain;
else
    console.log(
        'No --domain=xxx specified, taking default hostname "localhost".'
    );

// Configure the API port
var port = 8080;
if (argv.port !== undefined) port = argv.port;
else console.log('No --port=xxx specified, taking default port ' + port + '.');

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
swagger.configure(applicationUrl, '1.0.0');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/swagger/index.html');
});

require("./routes/hotels.routes.js")(app);

app.listen(3000, function() {
    console.log('server running on port 3000', '');
});

app.set('view engine', 'ejs');