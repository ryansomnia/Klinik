const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const ejs = require('ejs');


//setting cors
app.options('*', cors());



let dotenv = require('dotenv');
let env = dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set Templating Engine
app.set(ejs)
app.set('view engine', 'ejs')


// Navigation 
app.get('', (req,res) => {
    res.render('index')
})

app.use(cors());

app.use(morgan('dev'));

app.all('/*', function (req, res, next) {
 
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

app.use('/', require('./router'))


app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`);

})
