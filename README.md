# Team-project-Team15

## Online Banking system for AZASE

### Team Members : 
  
  * Anagha Sethuraman
  * Anushree 
  * Ealrada Piroyan
  * Sandhya Santhanam
  * Zeel Jayeshkumar Soni
  
### Tools and Languages used: 
   
  * Frontend : React JS
  * Backend  : Python Flask
  * Database : MongoDB
  * Postman - REST API client to test the developed APIs
  * Cloud - Amazon Web Services (AWS)
### Scrum manager tool: 
   
  * JIRA
  
### Scrum meetings schedule: 
   
  * Monday     
  * Wednesday
  * Fridays
  
### Tasks 
 
  * Frontend : Anagha Sethuraman , Zeel Jayeshkumar Soni
  * Backend  : Ealrada Piroyan ,  Sandhya Santhanam, Anushree
  * Database : Anushree 
   
### Extreme programming (XP) Core Values Implemented:

  * Communication
    * Communication was one of the key strengths of our team. Even though we were not able to meet in person and were in different time zones, our team managed to meet every week on Monday, Wednesday and Friday for the scrum.
    * During the call, we tracked our progress and also took care of dependency issues and other blockers.
    * We used JIRA to keep track of our user stories. This helped us to understand the progress of various tasks throughout the sprint.
    * We decided to take on tasks based on individual areas of strength and also helped each other by collaborating through our Slack channel on a daily basis. Any doubts or issues were discussed on the channel regularly.
    * In this difficult time of covid pandemic, we spent some time after scrum to vent out our frustrations and offer support to each other. This eventually helped in building good relationships among the team members.

  * Simplicity
    * We performed requirement analysis with a critical eye to identify essential parts of the project scope and do only what was needed.
    * Actively working on avoiding duplications helped us keep our code easy to maintain as we added more APIs and corresponding UI elements.
    * We ensured that the names of all classes/methods/variables are understandable and revealed the intent clearly.
  
  * Feedback
       * Feedback played a vital role during the initial stages and testing phase. We were dedicated to listen to everyone’s ideas without interruption. 
       * We had a built-in feedback review at the end of every meeting at least for 15 minutes to check on what worked according to the plan and what needs to be corrected in    future.
       * During the testing phase, we tested features developed by other team members and gave feedback to each other. It helped us to identify the bugs.
       * Feedback helped us in identifying the roadblocks, improve and perform better.
       
  * Courage 
       * We were deciding estimates according to real time circumstances and according to that we proceeded.
       * We didn't do unnecessary documentation for failures.
       * We worked as team, so that we did not had fear of working alone.
       * We were courageous enough to accept changes in the middle of implementation.

  * Respect
    * Everyone was respectful of other team members' time and suggestions. 
    * Team members respected different opinions and suggestions of each other during the process of choosing technology stacks. Everyone respectfully agreed on the       technologies that were chosen based on the majority vote and promised to study and gain the required skills for implementing them.
    * Whenever an unpredicted problem was happening to a team member, everyone was very supportive and respectful and tried to help and solved the issue

  




### Architectural Diagram
![architecture](https://user-images.githubusercontent.com/78836467/118317072-737eda80-b4ac-11eb-9baf-9384aa0d8431.png)


### Database Design
![image](https://user-images.githubusercontent.com/80734579/118350197-05511b00-b573-11eb-9557-bb5486d6db79.png)

![image](https://user-images.githubusercontent.com/80734579/118370838-33f8e100-b5c7-11eb-80b3-566f3f0713ec.png)

![image](https://user-images.githubusercontent.com/80734579/118370948-bbdeeb00-b5c7-11eb-8297-46d8771f983b.png)




### UI Wireframes
![azase-wireframe-HQ](https://user-images.githubusercontent.com/43404881/118243612-78fc0680-b453-11eb-8ab8-fa143f0255d3.png)


### Deployment Diagram

![image](https://user-images.githubusercontent.com/78231680/118372222-68d44c00-b565-11eb-9d50-b78bc3fbd701.png)



### Sprint Journal

![Sprint Journal - Zeel_page-0001](https://user-images.githubusercontent.com/20592430/118370300-e8f5b400-b55b-11eb-95fb-6bed0e67ddc9.jpg)


### Task Sheet

### BurnDown Charts
https://github.com/gopinathsjsu/team-project-team15/tree/main/Burn_down_charts

### EC2 Deployment with Load Balancer

* Created 2 instances and deployed application on both of them.

![image](https://user-images.githubusercontent.com/20592430/118372011-1f373180-b564-11eb-8cd8-89ceddf3923a.png)

* Created load balancer and added those 2 instances in it.

![image](https://user-images.githubusercontent.com/20592430/118371999-0e86bb80-b564-11eb-9d44-ef1609b7e9a2.png)

### Steps to test the application
1. Clone the repository
    ```
    git clone https://github.com/gopinathsjsu/team-project-team15.git
    ```
2. Go to react-app directory
    ```
    npm install
    npm run build
    ```
3. Go to online_bank
   * To open app on http
      ```
      pip install -r requirements.txt
      export FLASK_APP=run.py
      flask run --host=0.0.0.0 --port=80
      ```
  or
  * To open app on http://localhost:5000
      ```
      pip intsall -r requirements.txt
      python run.py
      ```
4. Open browser and check application







