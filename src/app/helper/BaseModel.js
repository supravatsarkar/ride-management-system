const { Model } = require("sequelize");

class BaseModel extends Model {
  static _insertIntoDb = function (body, options = {}) {
    return this.create(body, options);
  };
  _bulkInsertIntoDb = function (dataArray, options = {}) {
    return this._model.bulkCreate(dataArray, options);
  };

  static _findOne = async function (filter = {}) {
    const response = await this.findOne({ where: filter });
    return response;
  };

  static _updateOne = async function (data, filter = {}) {
    const [count, records] = await this.update(data, {
      where: filter,
      returning: true,
    });
    if (records.length > 0) {
      return records[0];
    }
    return null;
  };

  static _findAll = async function (
    filter = {},
    order = [["createdAt", "DESC"]]
  ) {
    const records = await this._model.findAll({
      where: filter,
      order: order,
    });
    return records;
  };

  static _getListByFilter = async function (
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

  static _search = function (records = [], value) {
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

  static _getSingleByFilter = async function (
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

  static _updateByFilter(update, whereEq, options = {}) {
    return this._model.update(
      update,
      {
        where: whereEq,
        returning: true,
      },
      options
    );
  }

  static _softDelete(filter, options = {}) {
    return this._model.destroy({
      where: filter,
      ...options,
    });
  }
  static _countByFilter(whereEq) {
    return this._model.count({
      where: whereEq,
    });
  }
}

module.exports = { BaseModel };
