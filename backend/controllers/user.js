exports.getProfile = (req, res) => {
  return res.json({ profile: req.profile });
};
