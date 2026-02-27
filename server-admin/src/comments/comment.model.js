'use strict';

import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    opinion: {
      type: Schema.Types.ObjectId,
      required: [true, 'La opinión relacionada es obligatoria'],
      ref: 'Opinion',
    },
    user: {
      type: String, 
      required: [true, 'El usuario es obligatorio'],
      ref: 'User',
    },
    contenido: {
      type: String,
      required: [true, 'El contenido del comentario es requerido'],
      trim: true,
      maxLength: [300, 'El comentario no puede exceder 300 caracteres'],
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

commentSchema.index({ opinion: 1 });
commentSchema.index({ isActive: 1 });

export default model('Comment', commentSchema);