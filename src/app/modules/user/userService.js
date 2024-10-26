const { BaseDbService } = require("../baseDbService");
const { UserModel } = require("./user.model");

class UserService extends BaseDbService {
  constructor(model) {
    super(model);
  }
}

const userService = new UserService(UserModel);
module.exports = userService;
