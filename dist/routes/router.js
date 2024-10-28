"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../usuario/controllers/usuario.controller");
const usuariosLogin_controller_1 = require("../login/controllers/usuariosLogin.controller");
exports.router = express_1.default.Router();
//teste rota publica
exports.router.get('/', (req, res) => {
    res.status(200).json({ "server": "Online" });
});
// CRUD USUARIO
exports.router.post('/usuarios/add', usuario_controller_1.usuarioAddControlle);
exports.router.get('/usuarios/search', usuario_controller_1.usuarioSearchController);
exports.router.put('/usuarios/edit/:id', usuario_controller_1.usuarioEditController);
//router.delete('/usuarios/delete/:id', usuarioDeleteController)
//login
//autenticar (/login)
exports.router.post('/usuario/login', usuariosLogin_controller_1.autenticaUserController);
//router.post('/usuario/logout'logoutMiddleware)
