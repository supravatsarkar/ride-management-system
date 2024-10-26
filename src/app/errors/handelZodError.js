const { httpStatus } = require("../helper/httpsStatus");

const handleZodError = (error) => {
  const { issues } = error;
  const errorDetails = issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: "Validation Error",
    errorDetails,
  };
};

module.exports = handleZodError;
