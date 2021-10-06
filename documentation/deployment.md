## Deployment

All the deployment files will be stored under the `.github/workflows`

### Available Workflows

#### AWS Lambda

- name - **Deploy lambda functions**
- action - `on push`
- branch - `main`
- environment
  - AWS_ACCESS_KEY_ID - *AWS access key from either iam user with right permission or admin*
  - AWS_SECRET_ACCESS_KEY - *AWS secret key from either iam user with right permission or admin*
