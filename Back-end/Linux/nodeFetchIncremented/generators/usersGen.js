const fs = require('fs');
const crypto = require('crypto');
const names = require('./names.json');
const domains = require('./domains.json');

const generateID = (users, idSize) => {
  let id = Math.floor(Math.random() * 10000 + 1);
  id = id.toString();
  let idExists = users.find((user) => user.id === id);

  if (idExists) {
    generateID(users, idSize);
  } else {
    return id;
  }
};

const generateName = (names) => {
  let name = '';
  const nameSize = Math.ceil(Math.random() * 4 + 1);

  for (let i = 0; i <= nameSize; i++) {
    const nameIndex = Math.floor(
      Math.random() * names.length
    );
    name += names[nameIndex].toUpperCase() + ' ';
  }

  return name.trim();
};

const generateEmail = (name, users, domains) => {
  const domainIndex = Math.floor(
    Math.random() * domains.length
  );
  let email =
    name.split(' ').slice(0)[0].toLowerCase() +
    name.split(' ').slice(-1)[0].toLowerCase() +
    '@' +
    domains[domainIndex];
  let emailExists = users.find(
    (user) => user.email === email
  );

  if (emailExists) {
    generateEmail(name, users, domains);
  } else {
    return email;
  }
};

const usersPool = (poolSize, idSize) => {
  console.time('Time elapsed:');
  let users = [];

  for (let i = 0; i <= poolSize; i++) {
    let userID = generateID(users, idSize);
    let userName = generateName(names);
    let userEmail = generateEmail(userName, users, domains);
    users.push({
      id: userID,
      name: userName,
      email: userEmail,
    });
  }

  return users;
};

const poolSize = 100;
const idSize = 8;

const users = usersPool(poolSize, idSize);

const duplicateUsers = users.filter(
  (el) => el.id === undefined
);
console.log(duplicateUsers);

fs.writeFile('users.json', JSON.stringify(users), (err) => {
  if (err) return console.log(err);

  console.timeEnd('Time elapsed:');
  console.log(
    `The json file containing ${poolSize} users with ${idSize}bits ids has been created at ${__dirname}.`
  );
});
