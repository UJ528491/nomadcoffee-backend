### Day 1

- On this challenge we are going to build a whole project from start to finish
  named Nomad Coffee.
- On this two day assignment we will set up our project.
- Create a Github Repository named 'nomadcoffee-backend'.
- Set up a Prisma project.
- The project should follow the architecture outlined on the video (.typeDefs.js
  , .resolvers.js).
- Use babel, nodemon and dotenv

### Day 2

- On your schema.prisma let's create the User model, the model must have the
  following fields: id username email name location password avatarURL
  githubUsername
- After you are done, make a createAccount resolver.createAccount should: Create
  a user Hash the password Check that the username / email aren't taken Return
  ok:true or ok:false, error:$error if there is an error.
