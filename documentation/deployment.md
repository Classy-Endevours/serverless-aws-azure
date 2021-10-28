## Deployment

All the deployment files will be stored under the `.github/workflows`

### Available Workflows

#### Pull request
- name - **Pull request checker**
- action - `on pull_request`
- branch - `main`
- criteria - `all test-cases should be passed`

#### 1. AWS Lambda

- name - **Deploy lambda functions**
- action - `on push`
- branch - `main`
- environment
  - AWS_ACCESS_KEY_ID - *AWS access key from either iam user with right permission or admin*
  - AWS_SECRET_ACCESS_KEY - *AWS secret key from either iam user with right permission or admin*
  - ENV - *self contained yml content as a string* *read about the keywords in `get-started.md` file*
    - DATABASE_URL
    - JWKS_URI
    - TOKEN_ISSUER
    - AUDIENCE
    - S3_BUCKET_NAME
#### 2. AWS Lambda Manual

- name - **Manually deploy lambda functions**
- action - `workflow_dispatch`
- branch - `none`
- input - `none`
- environment
  - AWS_ACCESS_KEY_ID - *AWS access key from either iam user with right permission or admin*
  - AWS_SECRET_ACCESS_KEY - *AWS secret key from either iam user with right permission or admin*
  - ENV - *self contained yml content as a string* *read about the keywords in `get-started.md` file*
    - DATABASE_URL
    - JWKS_URI
    - TOKEN_ISSUER
    - AUDIENCE
    - S3_BUCKET_NAME

#### 3. Azure

- name - **Deploy azure function**
- action - `on push`
- branch - `main`
- environment
  - AZURE_SUBSCRIPTION_ID - *azure subscription id with right permission or admin*
  - AZURE_TENANT_ID - *azure tenant id with right permission or admin*
  - AZURE_CLIENT_ID - *azure client id with right permission or admin*
  - AZURE_CLIENT_SECRET - *azure client secret with right permission or admin*
  - ENV - *self contained yml content as a string* *read about the keywords in `get-started.md` file*
    - DATABASE_URL
    - JWKS_URI
    - TOKEN_ISSUER
    - AUDIENCE
    - BLOB_CONTAINER
    - AZURE_CON_STRING
#### 4. Azure Manual

- name - **Manually deploy Azure function**
- action - `workflow_dispatch`
- branch - `none`
- input - `none`
- environment
  - AZURE_SUBSCRIPTION_ID - *azure subscription id with right permission or admin*
  - AZURE_TENANT_ID - *azure tenant id with right permission or admin*
  - AZURE_CLIENT_ID - *azure client id with right permission or admin*
  - AZURE_CLIENT_SECRET - *azure client secret with right permission or admin*
  - ENV - *self contained yml content as a string* *read about the keywords in `get-started.md` file*
    - DATABASE_URL
    - JWKS_URI
    - TOKEN_ISSUER
    - AUDIENCE
    - BLOB_CONTAINER
    - AZURE_CON_STRING