import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import Profesional from '@/models/Profesional';

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Faltan datos' }, { status: 400 });
  }

  const profesional = await Profesional.findOne({ email });

  if (!profesional) {
    return NextResponse.json({ message: 'Profesional no encontrado' }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, profesional.password);

  if (!isValid) {
    return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
  }

  // Aquí puedes configurar sesión, cookies o token
  return NextResponse.json({ message: 'Login exitoso' });
}
