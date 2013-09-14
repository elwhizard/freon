
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      service: 'postmark',
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      key: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  production: {
    db: 'mongodb://freon_user:--FRe()N!--@paulo.mongohq.com:10004/app18083805',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'FReoN - Feed Reader on Node.js'
    },
    facebook: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    linkedin: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/linkedin/callback"
    }
  },
  development: {
    db: 'mongodb://localhost/freon',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'FReoN - Feed Reader on Node.js'
    },
    facebook: {
      clientID: "190403101141775",
      clientSecret: "3154cf46887e5dc788f7ff0340f3460c",
      callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
    },
    twitter: {
      clientID: "nFxmIf2qrPBHNEDxRerb2g",
      clientSecret: "cQ1f2I4Kt8mU5YSrBqV0lAYHhSZQl1L3uLgzA9A5s0",
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    linkedin: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/linkedin/callback"
    }
  },
  test: {
    db: 'mongodb://localhost/freon_test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'FReoN Test'
    },
    facebook: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    linkedin: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/linkedin/callback"
    }
  },
  production: {}
}
