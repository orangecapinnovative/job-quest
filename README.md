

Another web application challenge for job apply.
you can directly open it on this url http://zapkub.github.io/#/
#Front end
  http://zapkub.github.io/#/

#Back end
  github is not provide an environment to run node and mongo so I deploy it to my (little) ec2 server.
  restful (GET,POST,PUT,DELETE) : http://rungsikorn.rocks:1234/api/trips
  




Welcome to TakeMeTour's Job Quest
===

Thank you for your application. First, we would like to take a simple test on your JavaScript skill. 

Choose to do one (or both) of frontend and backend tasks. Please fork me and submit your repository at [WantToWork@takemetour.com](mailto:WantToWork@takemetour.com) by **Monday February 8th, 2016 23:59 GMT+7**. 

Frontend Task
---
![Designed page](https://raw.github.com/PanJ/job-quest/master/frontend/design.png)

- Given the [designed page](https://raw.github.com/PanJ/job-quest/master/frontend/design.png), please write HTML and CSS accordingly
- Font used is [Roboto](https://www.google.com/fonts#UsePlace:use/Collection:Roboto)
- Please take a look at API [https://www.takemetour.com/api/home](https://www.takemetour.com/api/home) and use data from the API to display the inspiration section using JavaScript

**Bonus points**

- Write the stylesheet in SASS
- Support mobile screen (responsive)
- Use Browserify or Webpack

**Question**

Please explain what is single-page application and how it work. Give examples of tools used to make SPAs.

SPAs is a web application that will reload only content without full page load via resource api. There are many tools to make SPAs but the core is Javascript Ajax ( xhr ) inside a tons of js library and framework and serverside restful service.

Backend Task
---
- Develop a simple API to serve trip information
- API endpoints consists of
  - `GET /trips` list all trips (only trip `name` and `_id`)
  - `POST /trips` create new trip
  - `GET /trips/:id` get trip detail (all fields)
  - `PUT /trips/:id` update trip
  - `DELETE /trips/:id` delete trip
- Trip data consists of
  - `String` name
  - `Number` price
  - `String` description

**Bonus points**

- Use promise instead of async callback
- Use ES2015 syntax

**Question**

What is the difference between MongoDB and MySql?

Simple answer is MongoDB store data in different way it store data as json structure record instead of table like MySql.There are a lot of different thing between these two style of database ex. MySQL is relational database and has it own SQL query syntax , Mongo is better for scalability if I need to choose database for a project I prefer MongoDB.

###Comment
This test is really fun. hope you don't mind if I did any mistake, I really passionate and confident in my javascript skill but I still have a lot of thing to learn

Thanks
