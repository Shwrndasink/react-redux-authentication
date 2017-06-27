const User = require("../models/user");

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    // Error first
    if (err) {
      return next(err);
    }

    // Is a user already using this email
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // No errors, create user and save
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      console.log(res);

      res.json({ success: true });
    });
  });
};
