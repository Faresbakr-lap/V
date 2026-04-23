import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

const tokenForUser = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role: role || 'BUYER' },
    });

    return res.status(201).json({ token: tokenForUser(user), user: { id: user.id, email: user.email, role: user.role, name: user.name } });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({ token: tokenForUser(user), user: { id: user.id, email: user.email, role: user.role, name: user.name } });
  } catch (error) {
    return next(error);
  }
};
