import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'; // Importe a biblioteca
import { PontoService } from "../services/registroPonto.service";

interface JwtPayload extends jwt.JwtPayload {
    permissions: string[]; // Permissões no payload
    sub: string;           // Exemplo de outra propriedade
}


export const registrarPontoController = async (req: Request, res: Response, next: NextFunction) => {
    const tipoPonto = req.body
    const { registroPonto_tipo } = tipoPonto;
    const token: any = req.headers['authorization']
    const tokenParts = token.split(' ')
    const extractedToken = tokenParts[1] // Aqui está o token extraído
    const decoded = jwt.verify(extractedToken, 'e261b609570a6ad4484db9fe7cf240b2') as JwtPayload; // ou jwt.decode() se não precisar verificar a validade

    //segue o baile
   const usuario_id = parseInt(decoded.sub)
  
   const ponto = new PontoService()  
    const result = await ponto.VerificaPonto(usuario_id,registroPonto_tipo)
    res.status(200).json({
        result
    })
}

