'use strict';

import Comment from './comment.model.js';
import {
  fetchCommentsByOpinion,
  createCommentRecord,
  updateCommentRecord,
  softDeleteComment,
} from './comment.service.js';

// Obtener comentarios de una opinión
export const getCommentsForOpinion = async (req, res) => {
  try {
    const { opinionId } = req.params;
    const { page = 1, limit = 10, isActive = true } = req.query;
    const { comments, pagination } = await fetchCommentsByOpinion({ opinionId, page, limit, isActive });
    res.status(200).json({ success: true, data: comments, pagination });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener comentarios', error: error.message });
  }
};

// Crear comentario
export const createComment = async (req, res) => {
  try {
    const { opinionId } = req.params;
    
    const commentData = {
      opinion: opinionId,
      user: req.user.id, 
      contenido: req.body.contenido
    };

    const comment = await createCommentRecord({ commentData });
    res.status(201).json({ success: true, message: 'Comentario creado', data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error al crear comentario', error: error.message });
  }
};

// Actualizar comentario
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) return res.status(404).json({ success: false, message: 'No encontrado' });
    
    if (comment.user !== req.user.id) {
      return res.status(403).json({ success: false, message: 'No autorizado' });
    }

    const updated = await updateCommentRecord({ id, updateData: req.body });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Eliminar comentario (Soft Delete)
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) return res.status(404).json({ success: false, message: 'No encontrado' });

    if (comment.user !== req.user.id) {
      return res.status(403).json({ success: false, message: 'No autorizado' });
    }

    const deleted = await softDeleteComment({ id });
    res.status(200).json({ success: true, message: 'Eliminado', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};