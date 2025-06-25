// src/app/api/login-profesional/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import Profesional from '@/models/Profesional';

export async function POST(req: NextRequest) {
  try {
    const { email, password, token } = await req.json();

    if (!email || !password || !token) {
      return NextResponse.json({ message: 'Faltan datos o reCAPTCHA' }, { status: 400 });
    }

    // Verificar reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

    const captchaRes = await fetch(verifyUrl, { method: 'POST' });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return NextResponse.json({ message: 'Validación de reCAPTCHA fallida' }, { status: 400 });
    }

    // Conectar a base de datos
    await connectToDatabase();

    const profesional = await Profesional.findOne({ email });
    if (!profesional) {
      return NextResponse.json({ message: 'Profesional no encontrado' }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, profesional.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Aquí podrías crear token JWT o sesión en cookies

    return NextResponse.json({ message: 'Login exitoso' });
  } catch (error) {
    console.error('❌ Error en login-profesional:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
