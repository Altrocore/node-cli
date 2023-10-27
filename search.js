// search.js

function searchUser(query, users) {
  const result = users.find((user) => {
      return user.username === query || user.email === query || user.phone === query;
  });
  return result;
}

module.exports = { searchUser };
