// exports.catchAsyncError = (fn) => (req, res, next) =>
//   fn(req, res, next).catch(next);

exports.catchAsyncError = function (fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
  // RETRUNING THE SAME FUNCITON AFTER CHAINING CATCH METHOD TO IT
  // PASSING THE CALLBACK FUNC, NEXT, TO IT, SO THAT IT CATCH WILL CALL IT WITH ERR OBJ, WHICH WILL CATCH BY ERROR HANDLER
};
