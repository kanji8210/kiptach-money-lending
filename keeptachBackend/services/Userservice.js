import User from '../models/User.js';

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const findUserByPhone = async (phone) => {
  return await User.findOne({ where: { phone } });
};

export const findUserById = async (userId) => {
  return await User.findByPk(userId);
};
