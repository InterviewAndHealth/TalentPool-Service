# Microservices Express Backend Base

### This repository will be used as the base for the microservice architecture backend for the mock interview project.

## Architecture

- `database`: Responsible for handling the database operations.
- `repository`: Responsible for handling the database operations for a specific entity.
- `service`: Responsible for handling the business logic.
- `api`: Responsible for handling the API requests.
- `middlewares`: Responsible for handling the middlewares.
- `utils`: Responsible for handling the utility functions.

### IPC Broker

- `events`: Responsible for handling the IPC events.
- `rpc`: Responsible for handling the IPC RPC calls.

## Setup

1. Clone the repository.

2. Install the dependencies using following command:

```bash
npm install
```

3. Start the docker containers using following command:

```bash
docker-compose up -d
```

4. Setup the environment variables in the `.env` file.

5. Start the application using following command:

```bash
npm run dev
```
