# -LWC-toDoTasksManager-
App created to increase the employees work and productivity and reduce the productnation
 Force: lighting welcomes to task manager app:
Purpose of this app:
As we all know decoration says the super evil that will keep us away from secure and deep work
So this app will help Salesforce users to work within the salesforce environment and create tasks instead of leaving the app and get distracted, to finish the important tasks first 

Increate employee productivity buy a sitting list of things they want to achieve daily
Push employee to work when with low motivation
This app-based on books I read to reduce procrastination by using the 5-sec rule and eat that frog books



Flexibility:
this app can be fit on any type of salesforce application, we just need to deploy it to test environment and then prod
Colour flexibility, you can change the colour the way you want it to be 
Also, i made it to be working on all devices tables iPhone or pc (min :29:30 )
Features:
Time: depends on what country you live in the time will change, also if you see the time is wrong that will be a good thing because you need to change the time settings from the salesforce settings
Greeting message:  depends on your time with a happy smiley face to help the  brain to think in a positive way
5-sec rule:  push you to work
Timer: you need to set to help you to work on the small pieces of the project at the time, for example, you tell the brain, I’m going to work on that task only for 20 mins, you set the timmer and finish the task, make the timmer ring or give a sound/notification  after each time set will make you feel happier
you also can change the colour of the app, background and text
all these data sitting the ToDo object in salesforce database
you can also view the last 7 days achievement to collect your score and see your progress
the Work on TodoList App I have done
In the beginning, I developed that app on the localhost environment and tested it first to check everything working first before I deploy it to prod 
sfdx plugins:install @salesforce/lwc-dev-server
Authorize the DIV-HUB, make sure the settings enabled from = setup = dive hub = enabled devHub
  
Also now we will create scratch org because if you working on local hot you cant directly interact with salesforce org toDoManagerScratch
Create scratch org
"defaultusername": "toDoManagerScratch",
then I authorized my dev org :
ramialzuhairi89.2@gmail.com
now we have to start the LWC local server: sfdx force:lightning:lwc:start
as we can see this is the beauty of using Scratch org local host makes it easier than push the real code to production. Here when you can find your code
Server up on http://localhost:3333
===Now Build the logic===
add logic to js to get date and convert it to mins and seconds, 
also set that to be dynamical if morning will say good morning and if its afternoon it will say afternoon or good evening
also, I’m using functions that will track the time update when the time change every minute
 also, I used set functions to segregate the tasks where id it has done and complete or upcoming, also pass it as an object 
with css files also i used to get the function to segregate were the classes in different colors 
i create chalid compmnet and used API to make the varbles globle tyo be used in from the Child to the parent compnent 
now i will show you the back end and apex class object i have made for this project 
so in schemal buider i have created 1 object called tdo 
then created Apex class that will hep me to add the data of the task in the backend to alefoce database
sfdx force:source:push
sfdx force:user:permset:assign -n ToDoManager 




LWR6003: Listening on :3333
Server up on http://localhost:3333
How to install
sfdx plugins:install @salesforce/lwc-dev-server
sfdx force:lightning:lwc:start
Clone this repo or download as a zip file
Open the downloaded folder in VS Code
Authorize a Dev Hub Org
Create a Scratch Org
Push all metadata to scratch org (sfdx force:source:push)
Assign the permission set to the user to get access to all objects and metadata (sfdx force:user:permset:assign -n ToDoManager)
You should be able to see an app named "SFDCFacts Academy"

Future plans
Add Not-To-Do List very important 

Add the 5-sec rule feature/ sound and GO GO LETS DO IT! <Div> will appear and disappear
Add background colurs to make the user feels they own the app
Add reminder with flexible time with the sound ring after completed
 
 
