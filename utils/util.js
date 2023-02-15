// exports.catchAsyncError = (fn) => (req, res, next) =>
//   fn(req, res, next).catch(next);

exports.catchAsyncError = function (fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
};
