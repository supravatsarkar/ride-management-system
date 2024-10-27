const { z } = require("zod");

const createDriverSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    latitude: z.number({
      required_error: "Latitude is required",
    }),
    longitude: z.number({
      required_error: "Longitude is required",
    }),
    plateNumber: z.string({
      required_error: "Plate number is required",
    }),
    comfort: z.string({
      required_error: "Comfort is required",
    }),
    carModel: z.string({
      required_error: "Car model is required",
    }),
    // Add other fields as necessary
  }),
});

const updateDriverSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().min(10).max(20).optional(),
    // Add other fields as necessary
  }),
});

const driverValidation = {
  createDriverSchema,
  updateDriverSchema,
};

module.exports = driverValidation;
