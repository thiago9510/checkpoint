"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticaUserController = void 0;
const usuariosLogin_service_1 = require("../services/usuariosLogin.service");
const autenticaUserController = async (req, res) => {
    //ajustar para realizar o search
    const { usuario_email, usuario_password } = req.body;
    const service = new usuariosLogin_service_1.loginService();
    try {
        const response = await service.verificaLogin(usuario_email, usuario_password);
        if (response.success == false) {
            res.status(400).json(response);
        }
        else {
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.autenticaUserController = autenticaUserController;
