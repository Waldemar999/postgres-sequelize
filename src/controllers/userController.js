import { v4 } from 'uuid';

const users = [];

export const createUser = (request, response) => {
  const user = {
    ...request.body,
    UUID: v4(),
    isDeleted: false,
  };

  users.push(user);
  response.status(201).send(user);
};

export const updateUser = (request, response) => {
  const id = request.params.UUID;
  const user = users.find((elem) => elem.UUID === id);

  if (!user || user.isDeleted) {
    response.status(404).send({ error: 'User id is invalid' });
    return;
  }

  const updatedUser = {
    ...user,
    ...request.body,
  };

  users[users.findIndex((elem) => elem.UUID === id)] = updatedUser;
  response.send(updatedUser);
};

export const deleteUser = (request, response) => {
  const id = request.params.UUID;
  const user = users.find((elem) => elem.UUID === id);

  if (!user) {
    response.status(404).send({ error: 'User id is invalid' });
    return;
  }

  users[users.findIndex((elem) => elem.UUID === id)] = {
    ...user, isDeleted: true,
  };

  response.send(true);
};

export const getUser = (request, response) => {
  const id = request.params.UUID;
  const user = users.find((elem) => elem.UUID === id);

  if (!user) {
    response.status(404).send({ error: 'User id is invalid' });
    return;
  }

  response.send(user);
};

export const getUsersList = (request, response) => {
  const { limit, loginSubstring } = request.query;
  let userList = [...users];

  if (loginSubstring) {
    userList = userList.filter(({ login }) => (
      login.toLowerCase().startsWith(loginSubstring.toLowerCase())
    ));
  }

  userList.sort((a, b) => a.login.localeCompare(b.login));

  if (limit) {
    userList = userList.slice(0, limit);
  }

  response.send(userList);
};
