const { z } = require("zod");
const constants = require("../../config/constants");
const createDriverSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "Name is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6)
        .max(20),
      phoneNumber: z
        .string({
          required_error: "Phone number is required",
        })
        .min(10)
        .max(20),
      latitude: z
        .number({
          required_error: "Latitude is required",
        })
        .optional(),
      longitude: z
        .number({
          required_error: "Longitude is required",
        })
        .optional(),
      plateNumber: z
        .string({
          required_error: "Plate number is required",
        })
        .optional(),
      comfort: z.enum([...Object.values(constants.CAR_COMFORT_TYPE)]),
      carModel: z
        .string({
          required_error: "Car model is required",
        })
        .optional(),
    })
    .strict(),
});

const updateDriverSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      phoneNumber: z.string().min(10).max(20).optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      plateNumber: z.string().optional(),
      comfort: z
        .enum([...Object.values(constants.CAR_COMFORT_TYPE)])
        .optional(),
      carModel: z.string().optional(),
    })
    .strict(),
});

const getDriversSchema = z.object({
  query: z
    .object({
      page: z.string().optional(),
      limit: z.string().optional(),
      search: z.string().optional(),
      sort: z.string().optional(),
      order: z
        .enum([...Object.values(constants.SORT_ORDER)])
        .optional()
        .default(constants.SORT_ORDER.ASC),
      filter: z
        .object({
          totalEarnings: z.string().optional(),
          totalRides: z.string().optional(),
          status: z
            .enum([...Object.values(constants.DRIVER_STATUS)])
            .optional(),
          ratePerKm: z.string().optional(),
          rating: z.string().optional(),
          comfort: z
            .enum([...Object.values(constants.CAR_COMFORT_TYPE)])
            .optional(),
          carModel: z.string().optional(),
        })
        .optional(),
      filterOperator: z
        .enum([...Object.values(constants.FILTER_OPERATOR)])
        .optional()
        .default(constants.FILTER_OPERATOR.EQUALS),
    })
    .strict(),
});

const adminValidation = {
  createDriverSchema,
  updateDriverSchema,
  getDriversSchema,
};
module.exports = adminValidation;
