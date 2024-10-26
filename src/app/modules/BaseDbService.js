const constants = require("../config/constants");

class BaseDbService {
  _model;
  constructor(model) {
    this._model = model;
  }
  create = function (body, options = {}) {
    return this._model.create(body, options);
  };
  bulkCreate = function (dataArray, options = {}) {
    return this._model.bulkCreate(dataArray, options);
  };

  findOne = async function (filter = {}) {
    if (!filter) {
      return this._model.findOne();
    }
    const response = await this._model.findOne({ where: filter });
    return response;
  };

  update = async function (data, filter = {}) {
    const [count, records] = await this._model.update(data, {
      where: filter,
      returning: true,
    });
    if (records.length > 0) {
      return records[0];
    }
    return null;
  };

  findAll = async function (filter = {}, order = [["createdAt", "DESC"]]) {
    const records = await this._model.findAll({
      where: filter,
      order: order,
    });
    return records;
  };

  getListByFilter = async function (
    args = {},
    include,
    searchFields = [],
    selectFields = []
  ) {
    const { search, filter, page, limit } = args;
    limit = Number(limit) ? Number(limit) : constants.PAGINATION.DEFAULT_LIMIT;
    page = Number(page) ? Number(page) : constants.PAGINATION.DEFAULT_PAGE;
    const where = {
      ...filter,
    };
    const options = {
      // offset: skip,
      // limit: limit ? parseInt(limit, 5) : 5,
      order: [["createdAt", "DESC"]],
      include: include || [],
      raw: true,
    };
    selectFields.length > 0 && (options["attributes"] = selectFields);

    if (search && searchFields.length > 0) {
      const searchQueries = [];
      searchFields.map((field) => {
        searchQueries.push({
          [field]: {
            [Op.iLike]: `%${search}%`,
          },
        });
      });
      where[Op.or] = searchQueries || [];
    }

    if (page) {
      options.offset = (page - 1) * limit;
      options.limit = limit;
    }

    options["where"] = where;
    options["order"] = [["id", "DESC"]];
    console.log("options=>", options);
    const total = await this._model.count({ where });
    const records = await this._model.findAll(options);
    const totalPages = Math.ceil(total / limit);
    // console.log("totalPages", totalPages);
    return { totalPages, currentPage: page, total, records };
  };

  search = function (records = [], value) {
    const filters = [];
    records.forEach((record) => {
      filters.push({
        [record]: {
          [Op.iLike]: `%${value}%`,
        },
      });
    });
    return this._model.findAll({
      where: {
        [Op.or]: filters,
      },
      limit: 25,
    });
  };

  getSingleByFilter = async function (
    filter,
    include,
    orderBy = [["createdAt", "DESC"]]
  ) {
    return this._model.findOne({
      include: include || [],
      where: filter,
      order: orderBy,
    });
  };

  updateByFilter(update, whereEq, options = {}) {
    return this._model.update(
      update,
      {
        where: whereEq,
        returning: true,
      },
      options
    );
  }

  delete(filter, options = {}) {
    return this._model.destroy({
      where: filter,
      ...options,
    });
  }
  countByFilter(whereEq) {
    return this._model.count({
      where: whereEq,
    });
  }
}

module.exports = { BaseDbService };
