const axios = require('axios')
const LocalStrategy   = require('passport-local').Strategy;
const debug = require('debug')('app:config:passport')

function errorToString(error) {
	var output = ""
	if (error.response) {
		// The request was made and the server responded with a status code that falls out of the range of 2xx
		output = error.response.data
  } else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
    output = error.request
	} else {
		// Something happened in setting up the request that triggered an Error
		output = error.message
	}
	return JSON.stringify(output)
}

module.exports = function(passport) {
	
	  // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser((user, done) => done(null, user.id));
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
			try {
				const url = process.env.API_URL + 'photographes/' + id
				axios.get(url)
					.then(response => {
						const user = response.data
						if(!user) done(null, false, req.flash('loginMessage', 'No user found.'))
						done(null, user)
					})
					.catch(err => done(err))
			} catch(e) { debug(e) }
    })

    passport.use(new LocalStrategy(
			{
        //// by default, local strategy uses username and password, we will override with email
        //usernameField : 'mail',
        //passwordField : 'passwordHash',
        passReqToCallback : true // allows us to pass back the entire request to the callback
			},
    function(req, username, password, done) { // callback with email and password from our form

			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			try {
				const url = process.env.API_URL + 'photographex/byLogin/' + username
				axios.get(url)
					.then(response => {
						//debug("..." + JSON.stringify(response))
						const user = response.data
						if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'))
						////if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata(null, false, req.flash('loginMessage', 'No user found.'))
						return done(null, user)
					})
					.catch(err => done(null, false, req.flash('loginMessage', err.toString())))
				} catch (e) {
					debug("error: " + e)
				}
    }))
    
}
