// logger.js
const winston = require("winston");
const path = require("path");

// Define log file paths
const logDirectory = path.join(process.cwd(), "logs");
const errorLogPath = path.join(logDirectory, "error.log");
const combinedLogPath = path.join(logDirectory, "combined.log");

// Create the logger with different levels and transports
const logger = winston.createLogger({
  level: "info", // Default level is 'info', can be adjusted as needed
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [
    // Write all logs to the combined log file
    new winston.transports.File({ filename: combinedLogPath }),
    // Write only errors to the error log file
    new winston.transports.File({ filename: errorLogPath, level: "error" }),
  ],
});

// Console logging for non-production environments
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        // winston.format.simple(),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level}]: ${message}`
        )
      ),
    })
  );
}

module.exports = logger;
