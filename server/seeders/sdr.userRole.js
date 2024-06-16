const userRoleRepo = require("../models/userRole.js"),
    mongoose = require('mongoose'),
    config = require('config');//configuration settings store retriever

//create your array. i inserted only 1 object here
const UserRole = userRoleRepo.userRole;
const dburl = config.get('db.url');

const userRoles = [   
  new UserRole(
    {
        roleName: "Default",
        description: "Default User Role",
  })
]
//connect mongoose
mongoose
  .connect(dburl)
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
userRoles.map(async (p, index) => {
  await p.save()
  .then((err, result) => {
    if (index === userRoles.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});

// UserRole.insertMany(userRoles)
// .then((err, result) => {
//     if (index === userRoles.length - 1) {
//       console.log("DONE!");
//       mongoose.disconnect();
//     }
//   })
// .catch(function (err) {
//     response.status(500).send(err);
// });