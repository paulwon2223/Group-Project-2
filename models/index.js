// import models
const Post = require('./Post');
const Profile = require('./Profile');
const User = require('./User');

User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});

Profile.hasMany(Post, {
    foreignKey: 'profile_id'
});

Post.belongsTo(Profile, {
    foreignKey: 'id'
});

module.exports = {
    Post,
    Profile,
    User
};