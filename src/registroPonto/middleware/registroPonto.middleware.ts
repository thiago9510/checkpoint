import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'; // Importe a biblioteca

interface JwtPayload extends jwt.JwtPayload {
    permissions: string[]; // Permissões no payload
    sub: string;           // Exemplo de outra propriedade
}

export const verificaTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['authorization']

    if (token) {
        const tokenParts = token.split(' ')
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            res.status(401).json({
                sucess: false,
                message: 'Formato de token inválido. Deve ser "Bearer <token>"'
            })
        }
        const extractedToken = tokenParts[1] // Aqui está o token extraído
        try {
            const decoded = jwt.verify(extractedToken, 'e261b609570a6ad4484db9fe7cf240b2') as JwtPayload
            if (!decoded) {
                res.status(401).json({
                    success: false,
                    message: decoded
                })
            }
            next()//se token válido segue.
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Token inválido ou expirado',
                error: error
            })
        }
    }
}

/* 
  // Verifica se o usuário tem a permissão 'admin'
  if (!permissions.includes('admin')) {
    return res.status(403).json({ message: 'Permissão negada' });
  } */