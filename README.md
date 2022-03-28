
## SAP-LigaAC Lab2

Welcome to SAP-LigaAC Lab2
### Goals
- Get familiar with SAP BTP in Cloud Foundry environment
- Short introduction to cloud apps architecture by using the provided example

### Hands-on
- Setup of BTP trial account and get familiar with SAP BTP in Cloud foundry
  - Create and configure HANA Cloud instance and use Database Explorer to create new tables
  - Connect to Cloud Foundry and deploy the provided app in cloud
  - Check the application logs
- Test the app using the provided POSTMAN collection
- Start the app locally and use the remote HANA DB
- Enhance the provided app by adding new functionalities

### 1. Set Up BTP trial account
- [Introduction to SAP BTP](https://developers.sap.com/tutorials/cp-explore-cloud-platform.html "SAP BTP concepts")
- [Create BTP trial account](https://developers.sap.com/tutorials/hcp-create-trial-account.html "BTP trial")

### 2. BTP Cockpit
This is a simplified picture of the domain model you have in the Cloud Foundry Environment. If you want to learn more about the different entities, check the [documentation.](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/8ed4a705efa0431b910056c0acdbf377.html)

<br><br>
<img width="451" alt="image" src="https://github.com/SAP-archive/cf-sample-app-nodejs/raw/master/img/domain_model.png?raw=true">
<br><br>

### 3. SAP HANA Cloud

SAP HANA Cloud is a cloud-native database-as-a-service (DBaaS) solution with intelligent multi-model capabilities and support for application development.
SAP HANA Cloud is composed of:
- SAP HANA Cloud, HANA database - in memory data storage
- SAP HANA Cloud, data lake - cost-effective service to store large data sets

[Create an instance of SAP HANA Cloud HANA DB](https://developers.sap.com/tutorials/hana-cloud-deploying.html "Create HANA Cloud DB instance")

[Manage SAP HANA Cloud HANA DB](https://developers.sap.com/tutorials/hana-cloud-mission-trial-3.html "Manage HANA Cloud HANA DB")


### 4. Using CF CLI
Set the api target with:
```
cf api https://api.cf.us10.hana.ondemand.com
```
then login using `cf login`. Enter the details as provided during registration.

#### CF CLI useful Commands

 - `cf target` - displays the default organization and space for your account. In case of multiple organizations, it allows you to set a default organization (`-o`) and space (`-s`) within the organization.
 - `cf apps` - lists the application in your space
 - `cf stop {app_name}` - stops a running application
 - `cf start {app_name}` - starts a stopped application
 - `cf logs {app_name}`, `cf logs {app_name} --recent` - display the application logs (realtime, recent)
 - `cf env {app_name}` - display the application user and system provided environment variables
 - `cf services` - display the service instances in your space

#### Clone Lab2 GitHub repository

```
git clone git@github.com:SAP-LigaAC/lab2.git
```
or

```
git clone https://github.com/SAP-LigaAC/lab2.git
```

If the `git clone` command fails, then you will have to:
  - manually download the zip file from repository home page
  - decompress the zip File


### 3. App usage
LAB2 application is a basic example of a cloud multi target application, built using Express JS web server and providing REST APIs to the end users.Persistence layer is provided by SAP HANA Cloud HANA DB.

A multi-target application (MTA) is comprised of multiple software pieces (“modules”) which all share a common lifecycle for development and deployment. These modules can be written in different technologies and deployed to different targets respectively, but they all serve (different aspects of) a particular purpose for the application’s users.

#### Create tables for the data model entitites
Connect to Cockpit and use HANA DB Explorer to create the 'Passenger' and 'Booking" tables, by opening an SQL Console and running the `CREATE TABLE` commands from `sql-scripts\createTable.sql`.

#### Deploy the application in the BTP account
[Cloud MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/configuration/ "Cloud MTA Build Tool") has been used for building the application archive.

```
npm run deploy-cloud

```

After deploying the app, go to cockpit and check the app services bindings.
#### Test the app

Use POSTMAN to import the lab's provided POSTMAN collection and environmnet variables.
The app URL is configured in the POSTMAN environment variables, tehrefore whenever you test:
 - the remote app, the `{{rest_app_url}}` env variable should be configured with your remote app url obtained either from `cf apps` command or directly in the Cockpit.
 - the locally started app, the `{{rest_app_url}}` env variable should be configured with localhost:4001.

#### Start the application locally and use the remote HANA DB
Update `config\default-env.json` file with the environment variables related to HANA DB configuration and start the app.

```
cf env {app_name} ======> update `config\default-env.json`
npm install
npm start

```
#### Exercises

- Change the application LOG_LEVEL and check the impact (in Cockit, accessing the Logs menu, or using the CF CLI command)
- Create a new endpoint
  - for getting all the bookings
- Update an existing endpoint
  - When adding a new booking and an 'unique constraint violation' is received when adding data in the DB, send an explicit error with status code Conflict
#### Npm dependecies used by the app

- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/express-validator
- https://www.npmjs.com/package/body-parser
- https://www.npmjs.com/package/cf-nodejs-logging-support
- https://www.npmjs.com/package/http-status-codes
- https://www.npmjs.com/package/@sap/hana-client
- https://www.npmjs.com/package/@sap/xsenv

### Documentation

- https://www.sap.com/documents/2021/09/7476f8c4-f77d-0010-bca6-c68f7e60039b.html
- https://developers.sap.com/tutorials/cp-trial-quick-onboarding.html
- https://developers.sap.com/tutorials/btp-cockpit-instances.html


