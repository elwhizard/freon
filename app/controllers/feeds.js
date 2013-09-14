var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , utils = require('../../lib/utils')
  , FeedParser = require('feedParser')
  , request = require('request')
  , _ = require('underscore');

function urlChecker (url, user) {
  var i;
  if (url.trim() !== '') {
    for (i in user.feeds) {
      if (user.feeds[i].url === url) {
        return
      }
    }
  }

  return true;
}

exports.index = function (req, res) {

  var user = req.user;

  res.render('feeds/index', {
    title: 'Feed Reader on Node.js'
  });  

}

exports.list = function (req, res) {
  var user = req.user,
    feeds = {};

  if (user.feeds.length) {
    feeds = {
      total: user.feeds.length,
      data: user.feeds
    }
  }

  res.json(feeds); 
}

exports.create = function (req, res) {
  var user = req.user,
    url = req.body.feed,
    title = req.body.title

    if (urlChecker(url, user)) {

      var pushItem = user.feeds.push({title: title, url: url});

      user.save(function (err) {
        user;
        if (err) res.json({success: false});

        res.json({success: true, data: {url: url, title: title, _id: user.feeds[pushItem - 1].id}})
      });

    } else {
      res.json({success: false});
    }


}

exports.remove = function (req, res) {
  var user = req.user;

  var feedId = req.body.id;

  var feedItem = user.feeds.id(feedId);

  if (!feedItem) {
    res.json({success: false})
  } else {
    feedItem.remove();
    user.save(function (err) {
      if (err) res.json({success: false});
      res.json({success: true})
    })
  }
}


exports.rssParser = function (req, res) {
  var url = req.query.url;
  var body = [];  

request(url)
  .pipe(new FeedParser())
  .on('error', function(error) {
      console.error(error);
  })
  .on('meta', function (meta) {
    console.log('===== %s =====', meta.title);
  })
  .on('readable', function () {
    var stream = this, item;
    while (item = stream.read()) {
      console.log(item.title)
      body[body.length] = item;
    }    
  })
  .on('end', function () {
    res.json({items: body});
  })

}
