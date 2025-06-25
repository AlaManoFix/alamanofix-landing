// src/models/Profesional.ts
import mongoose, { Schema, Document, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IProfesional extends Document {
  nombre: string;
  profesion: string;
  email: string;
  telefono: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfesionalSchema = new Schema<IProfesional>(
  {
    nombre: { type: String, required: true },
    profesion: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

// 🔐 Hook para encriptar la contraseña antes de guardar
ProfesionalSchema.pre<IProfesional>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si no cambió, no rehashear

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Exporta el modelo evitando redefiniciones en desarrollo
const Profesional = models.Profesional || model<IProfesional>('Profesional', ProfesionalSchema);
export default Profesional;
