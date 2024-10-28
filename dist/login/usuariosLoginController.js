"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticaUserController = void 0;
const connect_1 = require("../database/connection/connect");
const usuariosEntity_1 = require("../database/entity/usuariosEntity");
const autenticaUserController = async (req, res) => {
    const { usuario_login, usuario_password } = req.body;
    try {
        //pega usuario
        const repoUser = connect_1.databaseConnection.getRepository(usuariosEntity_1.UsuarioEntity);
        repoUser.find({
            where: {
                usuario_email: usuario_login
            }
        });
        if (!repoUser) {
            return res.status(401).json({
                sucess: false,
                menssagem: `Usuário Inválido` // usuario não localizado
            });
        }
        /*         const verifcaSenha = await new CryptoData().verify(usuario_password, repoUser)
                if (!verifcaSenha) {
                    return res.status(401).json({
                        sucess: false,
                        menssagem: `Credenciais Inválidas` //senha inválida
                    })
                }
                else {
                    // gera token se a senha for validada //os id's presencisam estar em string
                    //Criar uma consulta no banco para pegar as permissões que a pessoa tem (devolver par ao front trabalhar as páginas)
                    const token = sign({sub: String(findUsuario[0].usuario_id), permissions: ['user','pessoa']}, "e261b609570a6ad4484db9fe7cf240b2", {   //usar um env
                        expiresIn: '5min'
                    })
                    return res.status(200).json({
                        sucess: true,
                        token
                    })
                } */
        return res.status(200).json(repoUser);
    }
    catch (error) {
        res.status(400).json({
            sucess: false,
            menssagem: error //erro
        });
    }
};
exports.autenticaUserController = autenticaUserController;
