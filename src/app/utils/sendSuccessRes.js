const sendSuccessRes = (
  res,
  { data = {}, message = "Executed successfully", statusCode = 200 }
) => {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    message,
    data,
  });
};

module.exports = { sendSuccessRes };
