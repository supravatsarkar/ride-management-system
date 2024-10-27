const { z } = require("zod");

const userRegistrationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
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
  }),
});
const userLoginSchema = z.object({
  body: z.object({
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
  }),
});

const generateAccessTokenByRefreshToken = z.object({
  cookies: z.object({
    refresh_token: z.string({
      required_error:
        "Refresh token is required. Please check the browser cookies",
    }),
  }),
});
const otpVerifySchema = z.object({
  body: z.object({
    otp: z
      .string({
        required_error: "OTP is required",
      })
      .min(6)
      .max(6),
  }),
});

const authValidation = {
  userRegistrationSchema,
  userLoginSchema,
  generateAccessTokenByRefreshToken,
  otpVerifySchema,
};

module.exports = authValidation;
