const fs = require('fs');

const createConfig = (host, port, username, password) => {
  const config = {
    host,
    port,
    username,
    password
  };
  fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
}

const updateConfig = (updatedConfig) => {
  fs.writeFileSync('config.json', JSON.stringify(updatedConfig, null, 2));
}

const deleteConfig = () => {
  fs.unlinkSync('config.json');
}

const getConfig = () => {
  return JSON.parse(fs.readFileSync('config.json', 'utf-8'));
}

module.exports = { createConfig, updateConfig };