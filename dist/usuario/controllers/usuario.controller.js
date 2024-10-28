"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioDeleteController = exports.usuarioEditController = exports.usuarioSearchController = exports.usuarioAddControlle = void 0;
const usuario_service_1 = require("../services/usuario.service");
//Create
const usuarioAddControlle = async (req, res) => {
    const usuario = req.body;
    const service = new usuario_service_1.UsuarioService();
    const response = await service.addUsuario(usuario);
    if (response.success == false) {
        res.status(400).json(response);
    }
    else {
        res.status(200).json(response);
    }
};
exports.usuarioAddControlle = usuarioAddControlle;
//Read
const usuarioSearchController = async (req, res) => {
    //ajustar para realizar o search
    const pessoa = req.query;
    const service = new usuario_service_1.UsuarioService();
    const response = await service.searchUsuario(pessoa);
    if (response.success == false) {
        res.status(400).json(response);
    }
    else {
        res.status(200).json(response);
    }
};
exports.usuarioSearchController = usuarioSearchController;
//edit
const usuarioEditController = async (req, res) => {
    const pessoaId = parseInt(req.params.id);
    const pessoa = req.body;
    const service = new usuario_service_1.UsuarioService();
    const response = await service.editUsuario(pessoaId, pessoa);
    if (response.success == false) {
        res.status(400).json(response);
    }
    else {
        res.status(200).json(response);
    }
};
exports.usuarioEditController = usuarioEditController;
//delte
const usuarioDeleteController = async (req, res) => {
    const usuarioId = parseInt(req.params.id);
    try {
        const service = new usuario_service_1.UsuarioService();
        const response = await service.deleteUsuario(usuarioId);
        if (response != undefined || response != null) {
            return res.status(response.status).json({
                sucess: response.success,
                menssagem: response.message
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            sucess: false,
            menssagem: error
        });
    }
};
exports.usuarioDeleteController = usuarioDeleteController;
