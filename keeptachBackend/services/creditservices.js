import Credit from '../models/Credit.js';

export const createCredit = async (creditData) => {
  return await Credit.create(creditData);
};

export const findCreditById = async (creditId) => {
  return await Credit.findByPk(creditId);
};