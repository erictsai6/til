Today I Learned (TIL) - Hipchat Integration
===================

# Introduction
In order to help facilitate growth and communication I wanted to start a program called TIL.  The idea is to integrate this with hipchat and tumblr so that developers can type

```
/til The difference between 1 and 2 is 1
```

I also want them to reference any prior posts as such
```
/til
```

# Prerequisites
```
export TIL_OAUTH_CONSUMER_KEY=<insert your key here>
export TIL_OAUTH_CONSUMER_SECRET=<insert your secret here>
export TIL_OAUTH_TOKEN=<insert your token here>
export TIL_OAUTH_TOKEN_SECRET=<insert your token secret here>

npm install
gulp
```