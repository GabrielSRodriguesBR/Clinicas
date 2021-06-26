
const express = require('express');
const db = require('./database');
const User = require('./models/User');
const { hash} = require ('bcryptjs');
const routes = require('./routes');
const path = require('path');
const app = express();

app.use('/src/public', express.static(path.join(__dirname, 'public')));
app.use('/src/content', express.static(path.join(__dirname, 'content')));

const passport = require('passport')
const session = require('express-session');
require('./authentication')(passport);
app.set('trust proxy', 1) 
app.use(session({
  secret: 'macarena',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



app.use(express.urlencoded({ extended: true}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if( req.session.passport)
    res.locals.user = req.session.passport.user;
  next();
});

app.use(routes);




(async () => {
    try {
      await db.sync();

      var checkUser =  await User.findByPk(1);
      if(checkUser == null){
        await User.create({
            username: 'admin',
            password: await hash("yamero", 8),
            name: 'Admin',
            usertype: 0
        })

      }
    } catch (error) {
        console.log(error);
    }
})();






app.listen(2078);