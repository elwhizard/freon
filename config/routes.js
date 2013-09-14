/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
  , feeds = require('../app/controllers/feeds')
  , site = require('../app/controllers/site')
  , auth = require('./middlewares/authorization')

/**
 * Route middlewares
 */

var userAuth = [auth.user.isLoggedIn]

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)

  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.',
      successRedirect: '/feeds'
    }), users.session)

  app.get('/users/:userId', auth.requiresLogin, users.show)

  app.param('userId', users.user)

  // home route
  app.get('/', site.index);


  // feeds routes
  app.get('/feeds', auth.requiresLogin, feeds.index);

  app.post('/feeds/add', auth.requiresLogin, feeds.create);
  app.get('/feeds/get', auth.requiresLogin, feeds.list);
  app.post('/feeds/remove', auth.requiresLogin, feeds.remove);
  app.get('/feeds/rssParser', auth.requiresLogin, feeds.rssParser);

  /* Todo
  Add social sites login
  */

  // Facebook
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin)

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback)
  // Twitter
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.signin)

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.authCallback)

  app.get('/auth/github',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.signin)

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.authCallback)

   app.get('/auth/linkedin',
    passport.authenticate('linkedin', {
      failureRedirect: '/login',
      scope: [ 
        'r_emailaddress'
      ]
    }), users.signin)
  app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      failureRedirect: '/login'
    }), users.authCallback)

}
