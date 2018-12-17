  ### 1. Prepare the database
  Make sure MySQL server is running, then start MySQL client from command line:
  ```bash
  mysql -u root -p [password]
  ```
  Run the following statements:
  ```mysql
  create database marta;
  use marta;
  source [project directory]/backend/v1/mysql/init.sql;
  ````
  ### 2. Start the API server
  ```bash
  cd [project directory]/backend/v1
  npm install # Install dependencies first
  npm start
  ```
  ### 3. For Xamarin.Forms
  Before building the project, make sure to replace the placeholder with your actual IP address in
  `[project_directory]/xamarin/MartaPassengerTraffic/MartaPassengerTraffic/LandingPage.xaml.cs`
  
  The line looks like this:
  ```c#
  var client = ((App)(Application.Current)).MyHttpClient;
  string endpoint = "http://[YOUR IP ADDRESS]:8080/stations";
  ```
  
