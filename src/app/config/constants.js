module.exports = {
  ROLE: {
    ADMIN: "admin",
    DRIVER: "driver",
    CLIENT: "client",
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    DEFAULT_SKIP: 0,
  },
  PRIVATE_FIELDS: ["password", "otp", "emailVerificationToken"],
  RESTRICT_COUNTRY: ["AF", "SY", "IR"],
  DRIVER_STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    BUSY: "busy",
  },
  CAR_COMFORT_TYPE: {
    SIMPLE: "simple",
    ELITE: "elite",
    CONVENIENT: "convenient",
  },
  FILTER_OPERATOR: {
    EQUALS: "equals",
    GREATER_THAN: "greaterThan",
    LESS_THAN: "lessThan",
  },
  SORT_ORDER: {
    ASC: "asc",
    DESC: "desc",
  },
};
