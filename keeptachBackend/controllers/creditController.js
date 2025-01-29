import { createCredit, findCreditById } from '../services/creditService.js';

export const applyForCredit = async (req, res) => {
  try {
    const credit = await createCredit({
      ...req.body,
      borrowerId: req.user.userId,
    });
    res.status(201).json(credit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCreditDetails = async (req, res) => {
  try {
    const credit = await findCreditById(req.params.creditId);
    if (!credit) {
      return res.status(404).json({ error: 'Credit not found' });
    }
    res.json(credit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};