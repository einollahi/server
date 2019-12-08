const {User} = require('../db/db');

const Repository = require('../modules/users-management/repository/userRepository')

async function createAdmin() {
  try {
    const adminFound = await User.findOne({where: {role: 'admin'}});

    if (!adminFound) {
      await createUser();

      console.log('--> Admin is Added');
    } else {
      console.log('--> Admin already is available');
    }
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

createAdmin();

async function createUser() {
  const userAdmin = await new Repository().createNewUser({
    username: 'admin',
    password: '123456',
    email: 'admin@test.com',
    role: 'admin',
    registered_by: 'admin',
    first_seen: true,
    register_date: Date(Date.now()),
    active: true,
  });

  return userAdmin.id;
}
