# Telosys Tools

Telosys Tools helps you to start a new application by generating one from an existing sql database :
  - Spring MVC + Spring Data JPA
  - AngularJS + Spring MVC + Spring Data JPA

Telosys Tools is an eclipse plugin.

This yeoman generator initialize an empty project by creating the Telosys Tools configuration.

You have just to answer the questions and you can import this project in eclipse which have the Telosys Tools plugin.

You will be able to generate your application with Telosys Tools.

# Tutorial

* Install yeoman
```npm install -g yeoman```

* Install ```telosys-generator``` for yeoman
```npm install -g telosys-generator````

* Create a new directory
```mkdir project1
cd project1```
* Initialize your project
```yo telosys```
* Answer these questions :
```
  * Project name ? (Folder's name by default)
  * Project version ?
  * Root package ?
  * Sources directory ? (src/main/java by default)
  * Resources directory ? (src/main/resources by default)
  * Test sources directory ? (src/test/java by default)
  * Test resources directory ? (src/test/resources by default)
  * Web directory ? (src/main/webapp by default)
  * Bundle ? => Select the bundles you want to use
    * If you want an application with AngularJS + Spring MVC + Spring Data JPA, Please select :
      * front-angularjs-TT210
      * front-springmvc-TT210-R2
      * persistence-springdatajpa-TT210-R2
      * service-springdatajpa-TT210-R2
    * Validate your choice with ENTER
```
=> Your project is initialized and the bundles are downloaded.

You can now import your project in eclipse.
* Start ```eclipse``` (Telosys Tools must be installed as plugin in eclipse)
* Import the project in eclipse :
  * File > Import > General > Existing projects into Workspace
  * Click on ```Browse...``` to search the project in the filesystem
  * Select your project in the filesystem
  * Click on ``Open```
  * The project is recognized by eclipse
  * You can finsh the import by clicking on ```Finish```
* The project is added in the workspace
 
