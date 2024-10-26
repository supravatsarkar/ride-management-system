const adminModel = require("./admin.model");

const { BaseDbService } = require("../baseDbService");

class AdminService extends BaseDbService {
  constructor(model) {
    super(model);
  }
}

const adminService = new AdminService(adminModel);

module.exports = {};
