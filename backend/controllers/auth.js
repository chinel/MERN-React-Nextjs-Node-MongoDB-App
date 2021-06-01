exports.signup = (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  res.json({
    user: { name, email, password },
  });
};
