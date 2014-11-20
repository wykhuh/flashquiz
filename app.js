var express        = require('express')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')

  , scores = require('./routes/scores')
  , questions = require('./routes/questions')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}


app.get('/myapp/scores', scores.findAll)
app.get('/myapp/scores/:id', scores.find)
app.post('/myapp/scores', scores.create)
app.put('/myapp/scores/:id', scores.update)
app.del('/myapp/scores/:id', scores.destroy)

app.get('/myapp/questions', questions.findAll)
app.get('/myapp/questions/:id', questions.find)
app.post('/myapp/questions', questions.create)
app.put('/myapp/questions/:id', questions.update)
app.del('/myapp/questions/:id', questions.destroy)


db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
