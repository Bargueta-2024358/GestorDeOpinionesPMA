import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateComment = [
  body('contenido')
    .trim()
    .notEmpty()
    .withMessage('El contenido del comentario es obligatorio')
    .isLength({ max: 300 })
    .withMessage('El comentario no puede exceder 300 caracteres'),
  checkValidators,
];

export const validateUpdateComment = [
  param('id').isMongoId().withMessage('ID inválido'),
  body('contenido')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('El comentario no puede exceder 300 caracteres'),
  checkValidators,
];

export const validateGetCommentById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];