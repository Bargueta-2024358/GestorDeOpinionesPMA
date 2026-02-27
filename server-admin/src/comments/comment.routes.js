'use strict';

import { Router } from 'express';
import {
  getCommentsForOpinion,
  createComment,
  updateComment,
  deleteComment,
} from './comment.controller.js';
import {
  validateCreateComment,
  validateUpdateComment,
  validateGetCommentById,
} from '../../middlewares/comment-validators.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

// mergeParams permite acceder al :opinionId definido en el router de opiniones
const router = Router({ mergeParams: true });

// Listado de comentarios para una opinión específica
router.get('/', getCommentsForOpinion);

// Crear comentario (requiere token)
router.post('/', validateJWT, validateCreateComment, createComment);

// Actualizar y eliminar por ID de comentario
router.put('/:id', validateJWT, validateUpdateComment, updateComment);
router.delete('/:id', validateJWT, validateGetCommentById, deleteComment);

export default router;

