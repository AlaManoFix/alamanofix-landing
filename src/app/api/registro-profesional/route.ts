// src/app/api/registro-profesional/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Profesional from '@/models/Profesional';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, profesion, email, telefono, password, token } = body;

    if (!token) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA requerido' }, { status: 400 });
    }

    // Validar reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
    const captchaRes = await fetch(verifyUrl, { method: 'POST' });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return NextResponse.json({ success: false, message: 'Validación de reCAPTCHA fallida' }, { status: 400 });
    }

    // Conexión con MongoDB
    await connectToDatabase();

    // Validar duplicado
    const existe = await Profesional.findOne({ email });
    if (existe) {
      return NextResponse.json({ success: false, message: 'Ya existe una cuenta con este correo' }, { status: 409 });
    }

    // Crear nuevo usuario (password se encripta desde el modelo)
    const nuevo = new Profesional({
      nombre,
      profesion,
      email,
      telefono,
      password, // sin encriptar, el modelo lo hará
    });

    await nuevo.save();

    return NextResponse.json({ success: true, message: 'Registro exitoso' });
  } catch (error) {
    console.error('❌ Error en registro-profesional:', error);
    return NextResponse.json({ success: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
