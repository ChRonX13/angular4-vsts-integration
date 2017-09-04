# Integrating Angular4 application with VSTS and Azure App Service

This seed project has been created to assist fast tracking some of the issues that can arise when integrating an Angular 4 application with VSTS. This project aims to achieve the following goals:

- setup a Build definition that builds and tests an Angular 4 application
- setup PhantomJS for headless testing as part of Build definition
- publish test results from Karma as part of the Build
- setup Release configuration to Publish this application to an Azure App Service

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2 and is based on the [Angular Tour of Heroes tutorial](https://angular.io/tutorial)

## Client Side Routing

In order to get client side routing to work for an application on Azure App Service, we'll need to create a **web.config** file to issue a url redirect. Simply add the below snippet to a web.config file to the root of the project. See documentation [here](https://angular.io/guide/deployment#routed-apps-must-fallback-to-indexhtml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="AngularJS Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## Setup PhantomJS Configuration

## Create VSTS Build Definition

This section involves creating the Build definition in VSTS in order to build the application ready for deployment. Credit to [Seth Reid's article](https://sethreid.co.nz/deploying-angular-cli-project-using-vsts-build-release/) for pointing me to the majority of the grunt work.

1. Create a new Empty build process in VSTS
---
![](empty.PNG)
---
2. Click on **Process** and ensure that the **Default agent queue** is set to **Hosted VS2017**. This will help prevent issues later on with PhantomJS and how it resolves the npm dependancy as documented [here](https://github.com/Microsoft/vsts-tasks/issues/1486)
---
![](process.PNG)
---
3. Set **Get sources** to the location of your repository

4. Select **Add Task** and add a new **npm task**. This step will install the npm dependancies of the project.
---
![](npmtask.PNG)
---
![](install.PNG)
---
5. Select **Add Task** and add a new **npm task**. This step will build the project. We'll execute the npm build command, which is mapped to a ng build as defined in the Angular project.json file.

   Set **Command** to _custom_

   Set **Command and arguments** to _run build_
---
![](build.PNG)
---
6. Select **Add Task** and add a new **npm task**. This step will execute the Karma tests associated with the project.

   Set **Command** to _custom_

   Set **Command and arguments** to _test -- --watch=false --single-run=true --reporters=junit,progress --browsers=PhantomJS_
---
![](test.PNG)
---
7. Select **Add Task** and add a new **Publish Test Results task**. This step will publish the JUnit formatted test results from the Karma execution.
---
![](publishtestresults.PNG)
---
   Set **Test result format** to _JUnit_

   Set **Test results files** to _testresults\**\test.xml_
---
![](testresults.PNG)
---
8. In order to enable client side routing on the Azure App Service, we'll need to copy the web.config file into the distribution folder for packaging. [Client Side Routing](##client-side-routing)

   Select **Add Task** and add a new **Copy Files**
---
![](copy.PNG)
---
   Set **Contents** to _web.config_

   Set **Target Folder** to _dist_
---
![](copyfiles.PNG)
---
9. Select **Add Task** and add a new **Archive Files**. This step will bundle up the files from the /dist folder into a zip, ready for publishing into the Release pipeline.
---
![](archivetask.PNG)
---
   Set **Root folder (or file)** to _archive_
---
![](archive.PNG)
---
10. Select **Add Task** and add a new **Publish Build Artifacts**. This step will publish the package that was just created as a build artifact. This will then be consumed by the Release definition that we shall create.
---
![](publishpackagetask.PNG)
---
   Set **Path to Publish** to _$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip_

   Set **Artifact Name** to _drop_
---
![](publishpackage.PNG)
---
## Create VSTS Release Definition
