'use strict';

import { Router } from 'express';
// Importamos el router de comentarios para anidarlo
import commentRoutes from '../comments/comment.routes.js'; 
import {
  getOpinions,
  getOpinionById,
  createOpinion,
  updateOpinion,
  deleteOpinion,
} from './opinion.controller.js';
import {
  validateCreateOpinion,
  validateUpdateOpinion,
  validateGetOpinionById,
} from '../../middlewares/opinion-validators.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

router.use('/:opinionId/comments', commentRoutes);

router.get('/', getOpinions);
router.get('/:id', validateGetOpinionById, getOpinionById);

router.post('/', validateJWT, validateCreateOpinion, createOpinion);
router.put('/:id', validateJWT, validateUpdateOpinion, updateOpinion);
router.delete('/:id', validateJWT, validateGetOpinionById, deleteOpinion);

export default router;