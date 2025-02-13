# TechnicalTest
1.- Repo information

./Backend/ is a Symfony project with a RESTful API and JWT for authentication, it is supposed to call the OpenSky API to fetch data for the frontend. It also contains the DockerFile used to build the Docker container for the Backend.

./Frontend/ An Angular project containing the Frontend. It has 2 pages: - A login page where all unauthenticated users will be able to login to get access to the home page. - The home page where they can select an Airport Code and a time range (both fields have validation) to find all the flights arriving to the selected airport during the selected time and it will be displayed in a table with pagination, sorting and column selection.

./docker-compose.yml is the file we will call from the console (docker-compose up -d --build) to build the containers. There are 4 containers: - A container for the Symfony backend. - A container for nginx to serve the backend instead of using symfony's build in server. - A container for the Frontend. - A container for the Data Base that we will use to store the only user we have for the authentication (we will need to manually load a backup to have that user)


2.- Project building instructions:

Thanks to the docker containers all you need to install before running this is Docker Desktop (for the containers), git (to clone the repo from Github) and Postman to register the test user we are going to use for authentication

Steps:

1.- Unzip the project and open a bash (PowerShell) in the folder

2.- once you have all the folder run "docker-composer -d --build" (-d flag because we will need to run the command to import the backup.sql into our database)

3.- Once all the containers are running run docker exec -it symfony_app php bin/console doctrine:migrations:migrate to migrate the Symfony database to the database in the container

4.- Now in Postman we make a post request to: http://localhost:9000/api/register with body (type raw->JSON): {
    "email": "jose@atexis.com",
    "password": "asdf1234"
}
* We do this to create the user we are going to use for the test. We could have a register page in the future but for the purpose of this test we will create it by hand with postman

5.- We go to: http://localhost:8080/ and use the previous information to login.
