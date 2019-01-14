const axios = require('axios')
const LocalStrategy   = require('passport-local').Strategy;
const debug = require('debug')('app:config:passport')

module.exports = function(passport) {
	
	  // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, 2)
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
			done(err, {user: "donpepe"})
        //User.findById(id, function(err, user) {
            //done(err, user);
        //});
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(new LocalStrategy(
			{
        //// by default, local strategy uses username and password, we will override with email
        //usernameField : 'mail',
        //passwordField : 'passwordHash',
        //passReqToCallback : true // allows us to pass back the entire request to the callback
			},
    function(username, password, done) { // callback with email and password from our form
			
			debug("antes de done: " + arguments.length)
			//return done("I have a error")
			//return done(null, false)
			//return done(null, false, req.flash('loginMessage', 'No user found.'))
			//return done(null, { message: 'ca marche' }) 

			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			try {
				const url = process.env.API_URL + 'photographes/byLogin/' + username
				axios.get(url)
					.then(response => {
						const user = response.data
						if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'))
						////if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata(null, false, req.flash('loginMessage', 'No user found.'))
						return done(null, user)
					})
					.catch(err => done(err))
				} catch (e) {
					debug("error: " + e)
				}
    }))
    
}
