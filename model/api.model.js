const fetchApi = () => {
  const fs = require('fs').promises;

  return fs.readFile('./endpoints.json', 'utf-8');
}

module.exports = { fetchApi }