const bcrypt = require('bcryptjs');
const UserModel = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {

    
    
    passport.serializeUser((user, done) => {

        done(null, {id: user.id, name: user.name, usertype: user.usertype});

    });

    passport.deserializeUser(async (_user, done) => {
        try{
            const user =  await UserModel.findByPk(_user.id);
            done(null, user);
        }
        catch(err){
            console.log(err);
            done(err, null);
        }
    

    });

     passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done)=>{
        try {
            const user =  await UserModel.findOne({ where: { username: username} });
            if(!user) return done(null, false);

            const isValid = bcrypt.compareSync(password, user.password);
            if(!isValid) return done(null, false);

            done(null, user);
            
        } catch (err) {
            console.log(err);
            done(err, false);
        }
    }));

}