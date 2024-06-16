const express = require('express'), //framework
    config = require('config'),//configuration settings store retriever
    helmet = require('helmet'), //secure your Node.js application by setting several HTTP headers
    session = require('express-session'),
    logger = require('morgan'), //logger
    debug = require('debug')('app:startup'), //debugger ('debug namespace')
    errDebug = require('debug')('app:error'), //debugger
    exphandlebars = require('express-handlebars'),
    compress = require('compression'),//enables static file compression
    helpers = require('helpers'),
    cookieParser = require('cookie-parser'),
    path = require('path'), //I/O path resolver
    fs = require("fs"), //I/O file service
    Joi = require('joi'); //input validator
    mongoose = require('mongoose') //ODM (Object Document Mapper)
    mongoStore = require('connect-mongo');


const app = express();
if (app.get('env') === 'development')
{
      app.use(logger('tiny')); //request logger (user only in dev)     
      debug('Morgan is enabled...'); 
}

const dburl = config.get('db.url');
mongoose.connect(dburl)
.then(() => debug(`Connected to MongoDB...`))
.catch(err => errDebug(`Could not connect to MongoDB! ${err}`) );

app.use(express.json()); //Json parser - generates req.body from JSON data
// app.use(bodyParser.json()); //same

// Should be placed before express.static
app.use(compress({
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// CookieParser should be above session
app.use(cookieParser());

// Express MongoDB session storage
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.get('sessionSecret'),
    store: mongoStore.create({
        mongoUrl: config.get('db.url')
    })
}));

// Create `ExpressHandlebars` instance with a default layout.
const handlebars = exphandlebars.create({
    layoutsDir: path.join(__dirname, 'server/views'),
    defaultLayout: 'layout',
    helpers      : helpers,
    extname      : '.html', //set extension to .html so handlebars knows what to look for

    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
        path.join(__dirname, 'public/views')
        // path.join(__dirname, 'server/views')
    ]
});

app.engine('html', handlebars.engine);

// app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'server/views'));

// //Custom middleware
// app.use(function(req, res, next) {
//     console.log('Authentication...');
//     next();
// });

 // Use helmet to secure Express headers
 app.use(helmet());
 app.disable('x-powered-by');


app.get('/', (req, res) => {
    res.render('index', { title: "First Page", message: "Hello"});
})

//Routes
fs.readdirSync(path.join(__dirname, 'server/routes')).forEach(function(file) {
    require("./server/routes/" + file)(app);
});


// var port = process.env.NODE_ENV || 3000;
var port = process.env.NODE_ENV || config.get('hosting.defaultPort');
app.listen(port, () => console.info(`Listening on port ${port}....`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });