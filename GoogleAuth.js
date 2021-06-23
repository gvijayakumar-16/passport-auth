const express = require('express')
const router = express.Router();
const passport = require('passport')

router.get('/login',
  passport.authenticate('google', { scope: "openid email profile" }));

router.get("/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || "/#/admin/overview");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;