const sequelize = require("../config/connection");
const { Post, Profile, User } = require("../models");

const postData = require("./postData.json");
const profileData = require("./profileData.json");
const userData = require("./userData.json");

// const seedDatabase = async() => {
//     await sequelize.sync({ force: true });

//     await User.bulkCreate(userData, {
//       individualHooks: true,
//       returning: true,
//       ignoreDuplicates: true,
//     });
//     // NOT SURE WHAT THIS DOES
//     process.exit(0);
// };

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await Profile.bulkCreate(profileData, {
//     individualHooks: true,
//     returning: true,
//   });
//   // NOT SURE WHAT THIS DOES
//   process.exit(0);
// };

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await Post.bulkCreate(postData, {
//     individualHooks: true,
//     returning: true,
//   });
//   // NOT SURE WHAT THIS DOES
//   process.exit(0);
// };

// seedDatabase();