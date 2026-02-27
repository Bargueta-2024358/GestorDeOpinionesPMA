'use strict';

import Opinion from './opinion.model.js';
import {
  fetchOpinions,
  fetchOpinionById,
  updateOpinionRecord,
  softDeleteOpinion,
} from './opinion.service.js';

// obtener lista de opiniones
export const getOpinions = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;
    const { opinions, pagination } = await fetchOpinions({ page, limit, isActive });

    res.status(200).json({
      success: true,
      data: opinions,
      pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las opiniones',
      error: error.message,
    });
  }
};

// obtener opinion por id
export const getOpinionById = async (req, res) => {
  try {
    const { id } = req.params;
    const opinion = await fetchOpinionById(id);
    if (!opinion) {
      return res.status(404).json({ success: false, message: 'Opinión no encontrada' });
    }
    res.status(200).json({ success: true, data: opinion });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la opinión',
      error: error.message,
    });
  }
};

// crear opinion
export const createOpinion = async (req, res) => {
  try {
    const data = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'No se pudo identificar al usuario desde el token',
      });
    }

    const opinion = new Opinion({
      ...data,
      owner: req.user.id, 
    });

    await opinion.save();
    res.status(201).json({ success: true, opinion });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la opinión',
      error: error.message,
    });
  }
};

// actualizar opinion
export const updateOpinion = async (req, res) => {
  try {
    const { id } = req.params;
    const opinion = await fetchOpinionById(id);
    
    if (!opinion) {
      return res.status(404).json({ success: false, message: 'Opinión no encontrada' });
    }
    if (opinion.owner !== req.user.id) {
      return res.status(403).json({ success: false, message: 'No tienes permiso para editar esta opinión' });
    }

    const updated = await updateOpinionRecord({ id, updateData: req.body });
    res.status(200).json({ success: true, message: 'Opinión actualizada', data: updated });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la opinión',
      error: error.message,
    });
  }
};

// eliminar opinion
export const deleteOpinion = async (req, res) => {
  try {
    const { id } = req.params;
    const opinion = await fetchOpinionById(id);

    if (!opinion) {
      return res.status(404).json({ success: false, message: 'Opinión no encontrada' });
    }

    if (opinion.owner !== req.user.id) {
      return res.status(403).json({ success: false, message: 'No tienes permiso para eliminar esta opinión' });
    }

    const deleted = await softDeleteOpinion({ id });
    res.status(200).json({ success: true, message: 'Opinión eliminada', data: deleted });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la opinión',
      error: error.message,
    });
  }
};