# Technologies Used  

  - Demo is hosted on: fierce-river-56667.herokuapp.com (note: email services for verification and password reset is not working in this demo due to absence of mail account).  
  - Nodejs with express framework backend.
  - Reactjs frontend.  
  - Reddis is used to manage sessions and cart.  
  - Bulljs is used to manage queue of emails and cron jobs.    
  - AdminBro is used as admin panel.  
  - Postgres DB with sequelize ORM.
  - Imagekit.io as the images server with realtime image crop and resize.
  - docker added to run in a container.
  

# FEATURES  
  
  - Paypal payment. 
  - Add product through admin panel just like a CMS. 
  - Create a discount for a certain duration and add selected items, after the duration ends discount is automatically removed. 
  - Control how much products to be delivered per day and dynamically generate delivery dates according to it.  
  - Order cancellation.
  - Product search.
  - products are organized as categories and subcategories.  
  - Bought products can be rated and with optional written review. 
  - Each product can have multiple colors each with diffent stock count and images. 
  - Multiple delivery address for each user, and one is selected upon checkout.  
  - Easy cart management with edit and delete functionalities. 
  - Order details.  
  - All expected user account management functionalities.
  - Fast performance.  
  
# How To Run  
  
  - copy .env-example files to a .env file and fill with your data. the .env file is used both with docker or local run.  
  - in development mode, go to client's package.json and specify the --host option if it is not localhost.
  - in development mode, go to client's webpack.config.dev and specify backend url to proxy ajax requests to. 
  - finally if using docker run using **docker-compose up**, if running localy run **npm run dev** in root folder and **npm start** in  client folder.


