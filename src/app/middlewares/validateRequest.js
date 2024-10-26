const validateRequest = (zodSchema) => {
  return async (req, res, next) => {
    try {
      const { body } = await zodSchema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      req.body = body;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateRequest;
