import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export async function register(req, res) {
  const { email, password } = req.body;
  if (!email || !password || password.length < 4) {
    return res.status(400).json({ success: false, error: "Datos inválidos" });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ success: false, error: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      data: { _id: newUser._id, email: newUser.email },
      token
    });
  } catch {
    res.status(500).json({ success: false, error: "Error en el registro" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, error: "Credenciales inválidas" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, error: "Credenciales inválidas" });

    const token = generateToken(user._id);
    res.json({ success: true, data: { _id: user._id, email: user.email }, token });
  } catch {
    res.status(500).json({ success: false, error: "Error en el login" });
  }
}
