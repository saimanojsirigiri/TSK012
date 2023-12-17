const resolve404Error = (req, res) => {
  res.status(404).json({
    error: "Details Not Found",
  });
};
module.exports = resolve404Error;
