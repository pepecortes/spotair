const debug = require('debug')('app:config:passport')
const CustomStrategy  = require('passport-custom').Strategy
const LocalStrategy  = require('passport-local').Strategy
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt

const Photographe = require('../app_api/models/db').Photographe

const jwtStrategy = new JWTStrategy(
	{
		passReqToCallback: true,
		secretOrKey: process.env.JWT_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	},
	function(req, payload, done) {
		debug("authenticating with token strategy: " + JSON.stringify(payload))
		try {
			if (payload.user != process.env.API_USER) {
				debug("returning not authorized" + payload.user + " != " + process.env.API_USER)
				return done(null, false)
			}
			return done(null, {})
		} catch (e) {debug("error: " + e)}
	}
)

const localStrategy = new LocalStrategy(
	{passReqToCallback: true},
	function(req, username, password, done) {
		debug("authenticating with local strategy: " + username)
		try {
			Photographe.findOne({where: {mail: username}})
				.then(user => {
					if (!user) return done(null, false, req.flash('loginMessage', 'No user found'))
					if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Mot de passe incorrect'))
					return done(null, user)
				})
				.catch(err => done(null, false, req.flash('loginMessage', err.toString())))
			} catch (e) {debug("error: " + e)}
	}
)

const apiStrategy = new CustomStrategy(
  function(req, done) {
		debug("authenticating with api strategy: " + req.hostname)
		try {
			if (req.hostname == "localhost") return done(null, {})
			return done(null, false)
		} catch(e) {debug("error: " + e)}
			
  }
)

module.exports = function(passport) {
	
	  // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser((user, done) => {
			if (user.id) return done(null, user.id)
			return done("passport error: user.id not found", false)
		})
    
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
    
    passport.use('jwt', jwtStrategy)
    passport.use('local', localStrategy)
    passport.use('api', apiStrategy)
		
    
}
