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

### Day 3

- editProfile: Change the user's profile, this includes changing password and
  changing the avatarURL.
- login: Log the user in by returning a JWT or return an error in case the
  password is wrong.
- seeProfile: See any users profile.
- You will also have to write some code to protect your resolvers and inject the
  logged in user to the resolver's context.
