"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pontoDeleteController = exports.pontoEditController = exports.pontoSearchController = exports.pontoAddControlle = void 0;
const ponto_service_1 = require("../services/ponto.service");
// Create
const pontoAddControlle = async (req, res) => {
    const { usuario_id, ...pontoData } = req.body; // Extrai `usuario_id` e os demais dados de `ponto`
    const ponto = {
        ...pontoData,
        usuario_id: Number(usuario_id) // Assegura que `usuario_id` é um número
    };
    const service = new ponto_service_1.PontoService();
    const response = await service.addPonto(ponto);
    if (!response.success) {
        res.status(400).json(response);
    }
    else {
        res.status(200).json(response);
    }
};
exports.pontoAddControlle = pontoAddControlle;
//Read
const pontoSearchController = async (req, res) => {
    //ajustar para realizar o search
    const ponto = req.query;
    const service = new ponto_service_1.PontoService();
    const response = await service.searchPonto(ponto);
    if (response.success == false) {
        res.status(400).json(response);
    }
    else {
        res.status(200).json(response);
    }
};
exports.pontoSearchController = pontoSearchController;
//edit
const pontoEditController = async (req, res) => {
    const pontoId = parseInt(req.params.id);
    const ponto = req.body;
    const service = new ponto_service_1.PontoService();
    const response = await service.editPonto(pontoId, ponto);
    if (response.success == false) {
        res.status(400).json(response);
    }
    else {
        res.status(200).json(response);
    }
};
exports.pontoEditController = pontoEditController;
//delte
const pontoDeleteController = async (req, res) => {
    const pontoId = parseInt(req.params.id);
    const service = new ponto_service_1.PontoService();
    const response = await service.deletePonto(pontoId);
    if (response) {
        res.status(response.status).json({
            sucess: response.success,
            menssagem: response.message
        });
    }
    else {
        res.status(400).json({
            sucess: false,
            menssagem: response
        });
    }
};
exports.pontoDeleteController = pontoDeleteController;
