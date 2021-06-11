const User = require("../models/user");
const shortId = require("shortId");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      // res.json({ user: success });
      res.json({
        message: "Signup success! Please signin.",
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //Check if user exist
  //Below instead of specifying email:email we use object shorthand syntax
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with that email does not exist. Please signup." });
    }
    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({ error: "Email and password do not match" });
    }
    //generate a json web token using user id, JWT Secret and expiry date
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });

    const { _id, username, name, email, role } = user;

    return res.json({
      token,
      user: { _id, username, name, email, role }, //here we prevented the hashed_password and salt from showing so we used object destructuring to pull out only field required
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};
