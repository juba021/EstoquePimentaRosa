/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');



var app = express();




/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public/'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

consign()
	.include('app/routes')
	.then('config/dbConnection.js')

	.into(app);


module.exports = app;



// const DB_CONNECTION = 'mongodb://localhost:27017/gamefy';

// var express = require('express');
// var port = process.env.PORT || 3001;

// mongoose.Promise = require('bluebird');
// var passport = require('passport');
// var flash = require('connect-flash');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

// var options = { server: { socketOptions: { keepAlive: 1 } } };
// mongoose.connection.openUri(DB_CONNECTION, options);

// require('./auth/passport')(passport); // pass passport for configuration

// var app = express();
// app.use(cookieParser());
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.set('view engine', 'ejs'); // set up ejs for templating

// // required for passport, session.
// app.use(session({ resave: true,	saveUninitialized: true, secret: 'up2AWwyyAZepUGrbxc9U' }));

// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session
// app.use(express.static('public'));

// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// app.listen(port);
// console.log('The magic happens on port ' + port);
