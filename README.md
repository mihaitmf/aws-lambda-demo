# aws-lambda-demo
Demo project using [serverless framework](https://github.com/serverless/serverless) and CloudFormation to deploy AWS Lambda services.

Serverless is used to keep the configuration of stateless services, lambda functions.

CloudFormation is used to keep the configuration of network infrastructure and data services, like VPCs, Subnets, Security Groups, RDS (ex: mysql), Dynamo DB, Elastic Search. 

### Quick Start
* Create the virtual machine with nodejs, npm and serverless installed  
`vagrant up`  
Log into the vagrant machine  
`vagrant ssh`

* Create a new Serverless Service/Project  
Create a Serverless template yml file and a default nodejs lambda function  
`sls create -t aws-nodejs -p my-lambda-service`    
Change directory  
`cd my-lambda-project`

* For projects requiring node modules, create package.json  
`npm init`  
Add dependencies in package.json, then update to bring node modules  
`npm update`

* Add AWS account credentials to Serverless  
`sls config credentials -p aws -k my_aws_access_key -s my_aws_secret`

* Deploy the service that will create AWS resources and nodejs lambda functions  
`sls deploy`

* Invoke the "hello" lambda function in AWS  
`sls invoke -f hello`

* Invoke a lambda function locally, for testing purposes  
`sls invoke local -f hello`

* Fetch lambda function logs  
Open up a separate tab in your console and stream all logs for a specific Function    
`sls logs -f hello -t 1m`

* Remove all Functions, Events and Resources from the AWS account  
`sls remove`

### CloudFormation Commands
* Change directory  
`cd cloud-formation`

* Create AWS stack using AWS CLI  
`aws --region eu-west-3 cloudformation create-stack --stack-name mihait-stack --template-body "$(cat services.json)"`

* Update AWS stack using AWS CLI  
`aws --region eu-west-3 cloudformation update-stack --stack-name mihait-stack --template-body "$(cat services.json)" --parameters "$(cat params.json)"`

* Delete AWS stack using AWS CLI  
`aws --region eu-west-3 cloudformation delete-stack --stack-name mihait-stack`
