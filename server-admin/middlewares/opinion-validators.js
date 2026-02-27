import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateOpinion = [
  body('categoria')
    .trim()
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .isLength({ max: 50 })
    .withMessage('La categoría no puede exceder 50 caracteres'),
  body('titulo')
    .trim()
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ max: 100 })
    .withMessage('El título no puede exceder 100 caracteres'),
  body('comentario')
    .trim()
    .notEmpty()
    .withMessage('El comentario es obligatorio')
    .isLength({ max: 500 })
    .withMessage('El comentario no puede exceder 500 caracteres'),
  checkValidators,
];

export const validateUpdateOpinion = [
  param('id').isMongoId().withMessage('ID inválido'),
  body('categoria')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La categoría no puede exceder 50 caracteres'),
  body('titulo')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('El título no puede exceder 100 caracteres'),
  body('comentario')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('El comentario no puede exceder 500 caracteres'),
  checkValidators,
];

export const validateGetOpinionById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];