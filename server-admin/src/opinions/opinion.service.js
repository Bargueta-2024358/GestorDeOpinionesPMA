'use strict';

import Opinion from './opinion.model.js';

export const fetchOpinions = async ({ page = 1, limit = 10, isActive = true }) => {
  const filter = { isActive };
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const opinions = await Opinion.find(filter)
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber)
    .sort({ createdAt: -1 });

  const total = await Opinion.countDocuments(filter);

  return {
    opinions,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalRecords: total,
      limit: limitNumber,
    },
  };
};

export const fetchOpinionById = async (id) => {
  return Opinion.findById(id);
};

export const createOpinionRecord = async ({ opinionData }) => {
  const opinion = new Opinion(opinionData);
  await opinion.save();
  return opinion;
};

export const updateOpinionRecord = async ({ id, updateData }) => {
  return Opinion.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const softDeleteOpinion = async ({ id }) => {
  return Opinion.findByIdAndUpdate(id, { isActive: false }, { new: true });
};