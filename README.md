# Application
This web application is about searching youtube videos.

**Please see backend and frontend folders for detailed descriptions.

## Infrastructure

This applications consists of two parts:
  1. Frontend: Single Page Application built with: React and Bootstrap.
  2. Backend: HTTP REST API built with Node.js, Express, MongoDB and RabbitMQ.

## How to run

to start the application use docker compose:

`docker-compose up --build`

once the app is running you can open:

http://localhost:3000

on your browser.

## Things could have improved

There are few things missing in this application because of time constraint.

  1. `Typescript` for static checking
  2. `Swagger` for api documentation
  3. `Elastic Search` for indexing youtube videos.
  4. Test cases in both frontend and backend.