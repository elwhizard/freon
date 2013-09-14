var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , utils = require('../../lib/utils')

exports.index = function (req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/feeds');
	} else {
		res.render('index');	
	}
	
}