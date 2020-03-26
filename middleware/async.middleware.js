/* 
One thing we can do to avoid repeating the try/catch code on each async middleware is write once in a high order function.
The asyncHandler receives a function and returns a function with three input params (oh wait!!! that's like a middleware function). This new function is responsible to executes the original function passing the three params and catching any error.
*/

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
