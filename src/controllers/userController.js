import { v4 } from 'uuid';
import db from '../data-access/models/index.js';

export const createUser = async (request, response) => {
  try {
    const user = await db.user.create({
      ...request.body,
      UUID: v4(),
      isDeleted: false,
    });
    response.status(201).send(user);
  } catch (error) {
    response.status(500).send({ error });
  }
};

export const updateUser = async (request, response) => {
  try {
    const id = request.params.UUID;
    const user = await db.user.findOne({ where: { UUID: id } });

    if (!user || user.isDeleted) {
      response.status(404).send({ error: 'User id is invalid' });
      return;
    }

    const [, updatedUser] = await db.user.update(request.body, {
      where: { UUID: id },
      returning: true,
    });
    response.send(updatedUser[0]);
  } catch (error) {
    response.status(500).send({ error });
  }
};

export const deleteUser = async (request, response) => {
  try {
    const id = request.params.UUID;
    const user = await db.user.findOne({ where: { UUID: id } });
  
    if (!user) {
      response.status(404).send({ error: 'User id is invalid' });
      return;
    }
  
    await db.user.update({ isDeleted: true }, {
      where: { UUID: id },
    });
    response.send(true);
  } catch (error) {
    response.status(500).send({ error });
  }
};

export const getUser = async (request, response) => {
  try {
    const id = request.params.UUID;
    const user = await db.user.findOne({ where: { UUID: id } });
  
    if (!user) {
      response.status(404).send({ error: 'User id is invalid' });
      return;
    }
  
    response.send(user);
  } catch (error) {
    response.status(500).send({ error });
  }
};

export const getUsersList = async (request, response) => {
  try {
    const { limit, loginSubstring } = request.query;
    let userList = await db.user.findAll();
  
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
  } catch (error) {
    response.status(500).send({ error });
  }
};
