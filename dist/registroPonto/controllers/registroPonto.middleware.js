"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importe a biblioteca
const verificaTokenMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            res.status(401).json({
                sucess: false,
                message: 'Formato de token inválido. Deve ser "Bearer <token>"'
            });
        }
        const extractedToken = tokenParts[1]; // Aqui está o token extraído
        try {
            const decoded = jsonwebtoken_1.default.verify(extractedToken, 'e261b609570a6ad4484db9fe7cf240b2'); // ou jwt.decode() se não precisar verificar a validade
            res.status(200).json({
                sucess: true,
                message: {
                    user: decoded.sub,
                    permissions: decoded.permissions
                }
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: 'Token inválido ou expirado',
                error: error
            });
        }
    }
};
exports.verificaTokenMiddleware = verificaTokenMiddleware;
/*
  // Verifica se o usuário tem a permissão 'admin'
  if (!permissions.includes('admin')) {
    return res.status(403).json({ message: 'Permissão negada' });
  } */ 
