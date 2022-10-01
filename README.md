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

more to follow...
