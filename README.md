# Ride Management System

## Local Setup

To set up the Ride Management System locally, follow these steps:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) version 20.10.0 or higher installed.
- Install [PostgreSQL](https://www.postgresql.org/download/) on your machine.

### Clone the Repository

### Install Dependencies

Run the following command to install the required dependencies:
`npm install`

### Set Up Environment Variables

Create a `.env` file in the root of the project using `.env.example` and add the following variables:

### Database Migration and Seeding

Run the following commands to set up your database:
`npm run migrate:all`
`npm run seed:all`

### Start the Application

You can start the application in development mode using:
`npm run dev`

### Additional Scripts

- To run the application in production mode, use:

  ```bash
  npm start
  ```

- To undo all migrations, use:
  ```bash
  npm run migrate:undo:all
  ```
