const { validationResult } = require("express-validator");

//This middleware helps us send back any validation error back to the
//client we will only be sending one error at a go so that we will not have
//loop through errors on the client side which is a bit annoying
exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next(); // so that we do not hault our application
};
