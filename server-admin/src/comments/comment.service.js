'use strict';

import Comment from './comment.model.js';

export const fetchCommentsByOpinion = async ({ opinionId, page = 1, limit = 10, isActive = true }) => {
  const filter = { opinion: opinionId, isActive };
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const comments = await Comment.find(filter)
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber)
    .sort({ createdAt: -1 });

  const total = await Comment.countDocuments(filter);

  return {
    comments,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalRecords: total,
      limit: limitNumber,
    },
  };
};

export const createCommentRecord = async ({ commentData }) => {
  const comment = new Comment(commentData);
  await comment.save();
  return comment;
};

export const updateCommentRecord = async ({ id, updateData }) => {
  return Comment.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const softDeleteComment = async ({ id }) => {
  return Comment.findByIdAndUpdate(id, { isActive: false }, { new: true });
};