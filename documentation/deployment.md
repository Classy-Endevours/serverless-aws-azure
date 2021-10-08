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
#### 2. AWS Lambda Manual

- name - **Manually deploy lambda functions**
- action - `workflow_dispatch`
- branch - `none`
- input - `none`
- environment
  - AWS_ACCESS_KEY_ID - *AWS access key from either iam user with right permission or admin*
  - AWS_SECRET_ACCESS_KEY - *AWS secret key from either iam user with right permission or admin*
