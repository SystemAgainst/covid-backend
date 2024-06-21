const Admin = require('./admin');
const User = require('./user');

Admin.hasMany(User, { foreignKey: 'adminId', as: 'users' });
User.belongsTo(Admin, { foreignKey: 'adminId', as: 'admin' });

module.exports = {
    User,
    Admin,
};