const LocalStrategy  = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const debug = require('debug')('app:config:passport')
const Photographe = require('../app_api/models/db').Photographe

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
    passport.serializeUser((user, done) => done(null, user.id));
    
    passport.deserializeUser(function(id, done) {
			try {
				Photographe.findByPk(id)					
					.then(user => {
						if(!user) done(null, false, req.flash('loginMessage', 'No user found'))
						done(null, user)
					})
					.catch(err => done(err))
			} catch(e) { debug(e) }
    })
		
    passport.use('token', new LocalStrategy(
			{},
			function(username, password, done) { // callback with email and password from our form
				debug("authenticating with token strategy: " + username)
				// find a user whose email is the same as the forms email
				// we are checking to see if the user trying to login already exists
				try {
					//return done(null, {user: "apiUser"})
					return done(null, false)
					//Photographe.findOne({where: {mail: username}})
						//.then(user => {
							//if (!user) return done(null, false, req.flash('loginMessage', 'No user found'))
							//if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Mot de passe incorrect'))
							//return done(null, user)
						//})
						//.catch(err => done(null, false, req.flash('loginMessage', err.toString())))
					} catch (e) {
						debug("error: " + e)
					}
		}))

    passport.use('local', new LocalStrategy(
			{passReqToCallback : true}, // allows us to pass back the entire request to the callback
			function(req, username, password, done) { // callback with email and password from our form
				debug("authenticating with local strategy: " + username)
				// find a user whose email is the same as the forms email
				// we are checking to see if the user trying to login already exists
				try {
					Photographe.findOne({where: {mail: username}})
						.then(user => {
							if (!user) return done(null, false, req.flash('loginMessage', 'No user found'))
							if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Mot de passe incorrect'))
							return done(null, user)
						})
						.catch(err => done(null, false, req.flash('loginMessage', err.toString())))
					} catch (e) {
						debug("error: " + e)
					}
		}))
		
		var jwtOptions = {}
		jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
		jwtOptions.secretOrKey = 'tasmanianDevil';
		//jwtOptions.issuer = 'accounts.examplesoft.com';
		//jwtOptions.audience = 'yoursite.net';
		
		//passport.use('apiKey', function(req, res, next) {
			//console.log('APIKEY TEST')
			//next()
		//}) 
		
		passport.use('apiKey', new JwtStrategy(
			jwtOptions,
			function(jwt_payload, done) {
				debug("authenticating with apiKey strategy: " + jwt_payload)
				return done(null, {user: "apiUser"})
				//User.findOne({id: jwt_payload.sub}, function(err, user) {
						//if (err) {
								//return done(err, false);
						//}
						//if (user) {
								//return done(null, user);
						//} else {
								//return done(null, false);
								//// or you could create a new account
						//}
				//});
		}))
    
}
