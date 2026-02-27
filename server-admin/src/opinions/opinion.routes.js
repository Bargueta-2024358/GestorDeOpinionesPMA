import { Router } from 'express';
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

// públicas
router.get('/', getOpinions);
router.get('/:id', validateGetOpinionById, getOpinionById);

// autenticadas
router.post('/', validateJWT, validateCreateOpinion, createOpinion);
router.put('/:id', validateJWT, validateUpdateOpinion, updateOpinion);
router.delete('/:id', validateJWT, validateGetOpinionById, deleteOpinion);

export default router;