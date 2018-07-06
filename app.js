const app = require('express')()
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const compression = require('compression')

const expiryDate = new Date(Date.now() + 60 * 60 * 1000)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: 'agrowebsession',
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      expires: expiryDate
    }
  })
)
require('./config/passport')(app)

let index = require('./routes/controller');
app.use('/', index)


app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
