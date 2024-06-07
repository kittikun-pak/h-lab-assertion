1. Assuming the system currently has three microservices: Customer API, Master Data
API, and Transaction Data API, there is a new feature that requires data from all
three microservices to be displayed in near real-time. The current technology stack
includes REST APIs and an RDBMS database. How would you design a new API for
this feature?

1.) Design the schema for this API
  - which data is needed from each microservice
2.) Design a new query if needed.
3.) Design a data response.
4.) Defined a new endpoint.
5.) Considering to use Redis to store a data

2. Assuming the team has started planning a new project, the project manager asks
you for a performance test strategy plan for this release. How would you
recommend proceeding to the project manager?

answer: Do load-testing by using a framework such as k6

3. Design and develop with robust test two APIs using NestJS and Postgres with the
following specifications:
  a. Create a Multilingual Product API: Develop an API that allows for the
  creation of products, each with attributes for name and description that
  support multiple languages.
  b. Multilingual Product Search API: Implement an API that enables searching
  for products by name in any language and returns results in a paginated
  format.

  answer: the answer is code in this repository.

  Additional Requirements:
  • Validation: Outline how you will validate data inputs in both APIs to ensure data integrity.
  
  answer: using a validation pipe
  
  • Database Design: Describe the database schema and the approach you will use to handle multilingual support for product information.
  
  answer: the requirement needs 'name' and 'description', so the table has to be a column 'name' and 'description', and considering to use jsonb as datatype
  because this datatype can support multi-language, I don't know how many language that support a feature So I start at 5 languages if feature need more language
  we can append from current data.

  • Testing Strategy: Explain your strategy for testing these APIs, including how you will
  handle unit tests, integration tests, and any end-to-end testing considerations.Please provide a
  detailed explanation of your design decisions for each of these aspects.

  answer: from my experience
  1.) unit-testing
    - the unit-test focus on some small part of code, normally I choose a part of service or domain-service which have business logic inside (DDD approch)
    after choose a part or function, I create test-case by branch coverage approch and then just do it.

  2.) intergration testing
    - my approach is implement feature and try to connect with adaptor (3rd party API, database, ...) and check the data is correctly or not.
    
  3.) end-to-end testing
  - my approach is implement the API and push to the sit-environment to integrate with the front-end part,
    and then check the application can work correctly match with the story from PO.
  
