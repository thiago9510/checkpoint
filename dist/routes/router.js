"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../usuario/controllers/usuario.controller");
const usuariosLogin_controller_1 = require("../login/controllers/usuariosLogin.controller");
const registroPonto_controller_1 = require("../registroPonto/controllers/registroPonto.controller");
exports.router = express_1.default.Router();
//teste rota publica
exports.router.get('/', (req, res) => {
    res.status(200).json({ "server": "Online" });
});
// CRUD USUARIO
exports.router.post('/usuarios/add', usuario_controller_1.usuarioAddController);
exports.router.get('/usuarios/search', usuario_controller_1.usuarioSearchController);
exports.router.put('/usuarios/edit/:id', usuario_controller_1.usuarioEditController);
exports.router.delete('/usuarios/delete/:id', usuario_controller_1.usuarioDeleteController);
//CRUD BATER PONTO
exports.router.post('/api/registrarPonto', registroPonto_controller_1.registrarPontoController);
exports.router.get('/api/consultarPonto', registroPonto_controller_1.consultarPontoController);
// CRUD Registro Ponto
//router.post('/ponto/add', pontoAddControlle) 
//router.get('/usuarios/search', pontoSearchController)
//router.put('/usuarios/edit/:id', pontoEditController)
//router.delete('/usuarios/delete/:id', pontoDeleteController)
//login
//autenticar (/login)
exports.router.post('/usuario/login', usuariosLogin_controller_1.autenticaUserController);
//router.post('/usuario/logout'logoutMiddleware)
