# Interview requirements

This repository contains the base code for recruitment exercise. Complete the tasks listed below and publish the solution on your github. Send us a link to your repository at least 1 day before the interview. 
We will discuss the proposed solution during the interview. You should be ready to present the working application on your local machine.

## Recruitment Task

- Beer page ~ style a cool beer page
- Home page favourites ~ add a list of favourite beers, do not clean after page reload
- Beer list filtering + pagination + sorting
- Progressive Web App, offline


## PWA testing
To test out the PWA functionality, we need to test out the production build. To simply do this you can install the spa-http-server with the command: 
`npm install http-server -g`
Once it is installed, go to your build directory and run:
`http-server --push-state -p 3000 -a localhost -o`
Now you are running the build version locally.