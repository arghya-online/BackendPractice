// // const asyncHandler = (fn) => (req, res, next) => {

// const asyncHandler = (fn) => {
//   return (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//   };
// };

// //the func takes

// export { asyncHandler };

//this async handler is used to wrap async functions in express routes, so that any errors thrown in the async function will be caught and passed to the next middleware (which is usually an error handler). This helps to avoid having to write try-catch blocks in every route handler and keeps the code cleaner.
const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export { asyncHandler };
