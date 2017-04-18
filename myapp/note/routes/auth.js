var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

//将用户信息序列化为一个session
passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});
//将session值去序列化，转为用户信息
passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});


passport.use(new GitHubStrategy({
    clientID: '5ae83663de8001ba9957',
    clientSecret: '8a5c5945e0843d3ceaa3a482923ec6164422fae5',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));


router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('success......')
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });


module.exports = router;
