const sendSuccessRes = (
  res,
  { meta = {}, data = {}, message = "Executed successfully", statusCode = 200 }
) => {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    message,
    meta,
    data,
  });
};

module.exports = { sendSuccessRes };
