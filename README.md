# microservices_blog
Blog using `node.js`, `react` and microservices architecture.

Built and based off [this course](https://www.udemy.com/course/microservices-with-node-js-and-react/)

## Overview of microservices

### Post and Comment:
- Built Post and Comment microservices from scratch using [Express](https://expressjs.com/en/api.html) and [Axios](https://www.npmjs.com/package/axios) for listening and sending HTTP requests, respectively.

### Query 
- Store in memory posts and comments and sync with event bus store, if query service is down
- Removes dependency on Post and Comment services - posts and comments will be displayable in front end from the Query service

### Moderation
- Service to check comments and update status based on basic black-listed moderation terms 

### Event bus
- Created from scratch for learning purposes using Express (sending `event data` via an `/events` route in each microservice)
- Includes an event store (in memory), to account for service downtime and for the Query service to check for missing posts, comments or moderation

### Service Model
![image](https://user-images.githubusercontent.com/42571140/193404032-50b4f4fd-3336-4844-86fa-f80d4503a539.png)

## Docker/Kubernetes setup
- Build images `Dockerfiles` in each folder
- Apply kubernetes config files in `infra/k8s` folder (to run deployments and services)
- On local machine: add line to end of `hosts` file (Windows: `C:\Windows\System32\drivers\etc`; Mac `etc\`). Add this line: `127.0.0.1 posts.com`. NB this redirects traffic going to `posts.com` to local host 
