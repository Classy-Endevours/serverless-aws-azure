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

### Environment
- AUDIENCE - *your oAuth audience*
- JWKS_URI - *your JWKS uri*
- TOKEN_ISSUER - *your token issuer*
- DATABASE_URL - *your database url*
- S3_BUCKET_NAME - *your S3 bucket name*
- BLOB_CONTAINER - *your azure blob container name*
- AWS_ACCESS_KEY_ID : *your AWS access ID (only needed locally)*
- AWS_SECRET_ACCESS_KEY : *your AWS access key (only needed locally)*
- AZURE_CON_STRING: *your azure connection string*

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
