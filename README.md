Today I Learned (TIL) - Hipchat Integration
===================

# Introduction
In order to help facilitate growth and communication I wanted to start a program called TIL.  The idea is to integrate this with hipchat and tumblr so that developers can simply type.
```
/til The difference between 1 and 2 is 1
```
The developers should then be able to visit the blog to see the history of all TILs.  Enforcing TILs daily  will also promote healthy team communication and could trigger further discussion on the topic.

# Prerequisites
- tumblr account
-- register oauth application
-- register blog with the newly created oauth application
-- retrieve from this site https://api.tumblr.com/console/calls/user/info:
--- consumer key
--- consumer secret
--- access token
--- access secret
- heroku account

# Development & Deployment
We will rely on the heroku client for local development and deployments.  For local development create a .env file with the necessary environment variables.  It should ultimately look like this.
```
TIL_OAUTH_CONSUMER_KEY=< YOUR CONSUMER KEY >
TIL_OAUTH_CONSUMER_SECRET=< YOUR CONSUMER SECRET >
TIL_OAUTH_TOKEN=< YOUR ACCESS TOKEN >
TIL_OAUTH_TOKEN_SECRET=< YOUR ACCESS SECRET TOKEN >
```
In order to do a deployment to heroku successfully please set the config variables in the heroku app to the same values since .env is gitignore'd 
