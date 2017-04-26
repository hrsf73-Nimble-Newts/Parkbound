const db = require('../index.js').db;

module.exports = (id) => {
  return db.query('SELECT * FROM forecast WHERE park_id = $1', id)
  .then((forecast) => {
    return forecast;
  })
  .catch((err) => {
    console.log(err);
  })
}