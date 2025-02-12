1.- Repo information

  ./Backend/ is a Symfony project with a RESTful API and JWT for authentication, it is supposed to call the OpenSky API to fetch data for the frontend. It also contains the DockerFile used to build the Docker container for the     Backend. 

  ./Frontend/ An Angular project containing the Frontend. It has 2 pages:
       - A login page where all unauthenticated users will be able to login to get access to the home page.
       - The home page where they can select an Airport Code and a time range (both fields have validation) to find all the flights arriving to the selected airport during the selected time and it will be displayed in a table           with pagination, sorting and column selection.
      
  ./docker-compose.yml is the file we will call from the console (docker-compose up -d --build) to build the containers. There are 4 containers:
       - A container for the Symfony backend.
       - A container for nginx to serve the backend instead of using symfony's build in server.
       - A container for the Frontend.
       - A container for the Data Base that we will use to store the only user we have for the authentication (we will need to manually load a backup to have that user)
     
  ./backup.sql is the backup we will use to create and populate the Data Base. 

2.- Project building instructions:

  Thanks to the docker containers all you need to install before running this is Docker Desktop (for the containers) and git (to clone the repo from Github)

  Steps:

  1.- open a console in the folder you would like to build this repo.

  2.- run "git clone https://github.com/Tplayer97/TechnicalTest.git"

  3.- once you have all the folder run "docker-composer -d --build" (-d flag because we will need to run the command to import the backup.sql into our database)

  4.- Once all the containers are running run 


