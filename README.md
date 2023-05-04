# ROR-Revature-Capstone
Revature capstone project for ruby on rails cohort


## Install
  Ruby version: 3.2.2-1    
    - latest stable at time of project start  
    - https://rubyinstaller.org/downloads/

  Noder version: 18.16.0    
    - latest version recommended for all users at project start  
    - https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi

## Github

  Branches:  
    - main: what is automatically pushed to AWS EC2 and S3 buckets  
    - staging: staging area for code that will have automated testing run on it to prepare for main/deployment? 
    - development: where members will pull and push to  

  Permissions:  
    - ALL code most be commmitted to a branch first (you should create a new branch before writing any code), and then pull request into the development branch   
    - Only Kyle, Xien, and Paul can approve pull requests to main, staging, or development branches  
    - Workflow should be pull development, code, pull developmnet, add code and commit  
    - Go to github.com to make a pull request to add your code to development branch   
  
  Instructions:  
    
      git clone https://github.com/KyleStulen-1/ROR-Revature-Capstone.git
      
      git pull origin development
      
      git checkout -b 'branchname'
      
      git pull origin development
      
      git add .
      
      git commit -m 'DESCRIPTIVE"
      
      git push -u origin 'branchname'
      
