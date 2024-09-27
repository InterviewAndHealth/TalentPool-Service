# Microservices Express Backend Base

### This repository will be used as the base for the microservice architecture backend for the mock interview project.

## Architecture

- `database`: Responsible for handling the database operations.
  - `repository`: Responsible for handling the database operations for a specific entity.
- `services`: Responsible for handling the business logic.
- `routes`: Responsible for handling the API routes.
- `middlewares`: Responsible for handling the middlewares.
- `utils`: Responsible for handling the utility functions.
- `config`: Responsible for handling the configuration.

### Broker

In the `services` directory, there is a `broker` directory that is responsible for handling the communication between the services. The broker is divided into two parts:

- `events`: Responsible for handling the events between the services.
- `rpc`: Responsible for handling the Remote Procedure Calls (RPC) between the services.

## Setup

1. Clone the repository.

2. Install the dependencies.

```bash
npm install
```

3. Start the docker containers.

```bash
docker-compose up -d
```

4. Setup the environment variables in the `.env` file.

5. Start the application.

```bash
npm run dev
```
