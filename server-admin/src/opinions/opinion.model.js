'use strict';

import { Schema, model } from 'mongoose';

const opinionSchema = new Schema(
  {
    owner: {
      type: String, 
      required: true,
      ref: 'User',
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
      maxLength: [50, 'La categoría no puede exceder 50 caracteres'],
    },
    titulo: {
      type: String,
      required: [true, 'El título es requerido'],
      trim: true,
      maxLength: [100, 'El título no puede exceder 100 caracteres'],
    },
    comentario: {
      type: String,
      required: [true, 'El comentario es requerido'],
      trim: true,
      maxLength: [500, 'El comentario no puede exceder 500 caracteres'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

opinionSchema.index({ isActive: 1 });
opinionSchema.index({ owner: 1, isActive: 1 });

export default model('Opinion', opinionSchema);