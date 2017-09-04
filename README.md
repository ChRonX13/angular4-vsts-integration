# Integrating Angular4 application with VSTS and Azure App Service

This seed project has been created to assist fast tracking some of the issues that can arise when integrating an Angular 4 application with VSTS. This project aims to achieve the following goals:

- setup a Build definition that builds and tests an Angular 4 application
- setup PhantomJS for headless testing as part of Build definition
- publish test results from Karma as part of the Build
- setup Release configuration to Publish this application to an Azure App Service

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2 and is based on the [Angular Tour of Heroes tutorial](https://angular.io/tutorial)

## Create VSTS Build Definition

This section involves creating the Build definition in VSTS in order to build the application ready for deployment. Credit to [Seth Reid's article](https://sethreid.co.nz/deploying-angular-cli-project-using-vsts-build-release/) for pointing me to the majority of the grunt work.

1. Create a new Empty build process in VSTS


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
