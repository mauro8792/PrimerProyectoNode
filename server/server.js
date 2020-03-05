const express = require('express')
const app = express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});
const port = 3000
const routes = require( '../routes/routes' )
const morgan = require('morgan')
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config()

app.use( morgan( "dev") );
routes(app)

app.get("*", (req, res) => res.status(400).send({
	message: "No se encuentra el recurso"
}));

// // Website you wish to allow to connect to
// response.setHeader('Access-Control-Allow-Origin', '*');

// // Request methods you wish to allow
// response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// // Request headers you wish to allow
// response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// // Set to true if you need the website to include cookies in the requests sent
// // to the API (e.g. in case you use sessions)
// response.setHeader('Access-Control-Allow-Credentials', true);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))