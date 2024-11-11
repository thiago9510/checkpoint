"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarPontoController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importe a biblioteca
const registroPonto_service_1 = require("../services/registroPonto.service");
const registrarPontoController = async (req, res, next) => {
    try {
        const tipoPonto = req.body;
        const { registroPonto_tipo } = tipoPonto;
        const token = req.headers['authorization'];
        const tokenParts = token.split(' ');
        const extractedToken = tokenParts[1]; // Aqui está o token extraído
        const decoded = jsonwebtoken_1.default.verify(extractedToken, 'e261b609570a6ad4484db9fe7cf240b2'); // ou jwt.decode() se não precisar verificar a validade      
        const usuario_id = parseInt(decoded.sub);
        //verifica se já existe ponto
        const ponto = new registroPonto_service_1.PontoService();
        const result = await ponto.VerificaPonto(usuario_id, registroPonto_tipo);
        if (!result.success == true) {
            res.status(400).json(result);
        }
        else if (result.ponto != 'Nao') {
            res.status(403).json(result);
        }
    }
    catch (error) {
        res.status(403).json(error);
    }
};
exports.registrarPontoController = registrarPontoController;
