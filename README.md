# serverless-aws-azure
## Description
A platform where a user can submit the incident reports by making a call to the 
API available to the project. API will ask a form data with attachment and description for the incident.
Following with the incident an authorized user can view, download all or individual entries along with the attachment 

## Technologies
Following are the technologies used to build this project. Few of them will get added sooner in the timeline
- NodeJS
- TypeScript
- AWS Lambda
- Azure
- Native Postgres Database
- auth0
- JWT
- Amazon S3
- Prisma
- PostgresQL

## Architecture
https://lucid.app/documents/view/73e67c0a-ae9b-4da0-a6e7-941f764df4bc
This project is using a hexagonal architecture which will have database and network interfaces.
The core logic is isolated with the interfaces. 
Version-one architecture workflow diagram is as follow
![Serverless Azure and AWS](https://user-images.githubusercontent.com/24205953/136236029-0a608b1b-dbc1-4f4c-b6f0-39d174d8eaae.png)

## Database Diagram
*This will be added sooner once the database setup has been done*

## Security
To ensure security for the application, we have used auth0 service and apparently with JWT. Following will be process of the authentication

![image](https://user-images.githubusercontent.com/24205953/136237706-b6d7fc09-9b6e-4128-b3a6-b07ed5044235.png)

## Useful links

- [Getting Started](documentation/getting-started.md)
- [Folder structure](documentation/folder-structure.md)
- [Deployments](documentation/deployment.md)
