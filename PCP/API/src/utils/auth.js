import jwt from 'jsonwebtoken';

// Função para gerar um token JWT
export function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Função para verificar um token JWT
export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}