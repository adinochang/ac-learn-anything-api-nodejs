# Learn Anything API (Node.js)

An AI-powered web application that generates personalized learning paths and summarizes complex content, built with Node.js and the OpenAI API.

## Author

Adino Chang - [GitHub Profile](https://github.com/adinochang) | [LinkedIn Profile](https://www.linkedin.com/in/adinochang)

## Table of Contents

* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Running the Application](#running-the-application)
* [Project Structure](#project-structure)
* [API Endpoints](#api-endpoints)


## Technologies Used

* **Node.js**
* **Express.js**
* **TypeScript**
* **OpenAI API**
* **PostgreSQL (TODO)**
* **ORM (TODO)**

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn
* Access to an OpenAI API key.
* A running PostgreSQL instance.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/adinochang/ac-learn-anything-api-nodejs.git](https://github.com/adinochang/ac-learn-anything-api-nodejs.git)
    cd ac-learn-anything-api-nodejs
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project. This file will contain sensitive information and configuration.
    

2.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The API should now be running, typically on `http://localhost:3000` (or the `PORT` specified in your `.env` file).

## Project Structure

A typical Node.js Express.js API project structured with TypeScript often looks like this:

```
src/
├── app.ts             # Main Express application setup
├── config/            # Configuration files 
├──── prompts/         # AI instruction prompts
├── controllers/       # Request handlers for routes
├── db/                # Drizzle ORM schema index
├──── schemas/         # Drizzle ORM schemas
├── middlewares/       # Middleware files
├── migrations/        # Migration files generated by Drizzle ORM
├── repositories/      # Repository classes for database operations
├── routes/            # API route definitions
├── services/          # Business logic, interaction with external APIs (like OpenAI) and database
├── models/            # Database schemas/entities
├── types/             # Custom TypeScript type definitions
└── server.ts          # Entry point for starting the server
.env                   # Environment variables
package.json           # Project dependencies and scripts
tsconfig.json          # TypeScript configuration
```


## API Endpoints

This API provides various endpoints for interacting with the Learn Anything platform and its AI capabilities.

For comprehensive and interactive API documentation, including detailed information on all available endpoints, their parameters, request/response schemas, and example usage, please refer to:

(TODO: Interactive API Documentation)