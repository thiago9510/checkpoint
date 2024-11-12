import express from 'express'
import { Request, Response } from 'express'
import { usuarioAddController, usuarioEditController, usuarioSearchController, usuarioDeleteController } from '../usuario/controllers/usuario.controller'
import { autenticaUserController } from '../login/controllers/usuariosLogin.controller'
import { pontoAddControlle, pontoDeleteController, pontoEditController, pontoSearchController } from '../ponto/controllers/ponto.controller'


import { consultarPontoController, registrarPontoController } from '../registroPonto/controllers/registroPonto.controller'
import { verificaTokenMiddleware } from '../registroPonto/middleware/registroPonto.middleware'

export const router = express.Router()

//teste rota publica
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ "server": "Online" })
})

// CRUD USUARIO
router.post('/usuarios/add', usuarioAddController) 
router.get('/usuarios/search', usuarioSearchController)
router.put('/usuarios/edit/:id', usuarioEditController)
router.delete('/usuarios/delete/:id', usuarioDeleteController)

//CRUD BATER PONTO
router.post('/api/registrarPonto', registrarPontoController)
router.get('/api/consultarPonto', consultarPontoController)

// CRUD Registro Ponto
//router.post('/ponto/add', pontoAddControlle) 
//router.get('/usuarios/search', pontoSearchController)
//router.put('/usuarios/edit/:id', pontoEditController)
//router.delete('/usuarios/delete/:id', pontoDeleteController)

//login
//autenticar (/login)
router.post('/usuario/login', autenticaUserController)
//router.post('/usuario/logout'logoutMiddleware)