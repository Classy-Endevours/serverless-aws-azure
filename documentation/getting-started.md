## Getting Started

### Technologies
- NodeJS
- TypeScript
- AWS Lambda
- Azure
- Azure BloB
- Heroku Databases
- Postgres
- Prisma
- AWS S3
- auth0
- JWT
- Send Grid

### Environment
- aws - *your AWS related environment*
  - DATABASE_URL - *your aws database url*
  - S3_BUCKET_NAME - *your S3 bucket name*
- azure - *your Azure related environment*
  - DATABASE_URL - *your azure database url*
  - BLOB_CONTAINER - *your azure blob container name*
  - AZURE_CON_STRING: *your azure connection string*
- AUDIENCE - *your oAuth audience*
- JWKS_URI - *your JWKS uri*
- TOKEN_ISSUER - *your token issuer*
- AWS_ACCESS_KEY_ID : *your AWS access ID (only needed locally)*
- AWS_SECRET_ACCESS_KEY : *your AWS access key (only needed locally)*
- SENDGRID_API_KEY: *your send grid api key*
- SENDER_EMAIL: *your send grid verified sender email address*
- RECEIVER_EMAIL: *your receiving email address*

## Installation
### AWS
1. clone the repo
2. go to project directory
3. run `yarn` to install the deps
4. run `yarn run dev` *it will start project locally on the serverless-offline*
5. Make any changes other than `.yml` file to see the hot reloading

### Azure
1. clone the repo
2. go to project directory
3. run `yarn` to install the deps
4. run `yarn run dev:azure` *it will start project locally on the serverless-offline*
5. Make any changes other than `.yml` file to see the hot reloading
