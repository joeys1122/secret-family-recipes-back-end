const db = require('../data/db-config')

function getAllUsers() { return db('users') }

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
  return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

function getUserById(id) {
  return db('users').where('id', id).first()
}

function getUserBy(filter) {
  return db('users').where(filter).first()
}

module.exports = {
  getAllUsers,
  insertUser,
  getUserById,
  getUserBy
}