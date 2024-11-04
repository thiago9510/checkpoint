"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const cryptoData_1 = require("../../utility/bcrypt/cryptoData");
const login_repositories_1 = require("../repositories/login.repositories");
const jsonwebtoken_1 = require("jsonwebtoken");
class loginService {
    constructor() {
        this.repoLogin = new login_repositories_1.LoginRepository();
    }
    /**
    * Verifica Email
    * @param login - Login a ser verificado
    * @returns Resultado da operação
    */
    async verificaLogin(login, password) {
        try {
            const email = await this.repoLogin.email({ usuario_email: login });
            if (email instanceof Error) {
                return {
                    success: false,
                    message: 'Usuario Inválido',
                    error: email
                };
            }
            else {
                if (email.usuario_password) {
                    //retorno usuario //verifica senha
                    const verifcaSenha = await new cryptoData_1.CryptoData().verify(password, email.usuario_password);
                    if (!verifcaSenha) {
                        return {
                            success: false,
                            message: 'Senha Inválida'
                        };
                    }
                    else {
                        const token = (0, jsonwebtoken_1.sign)({ sub: String(email.usuario_id), permissions: ['user', 'pessoa'] }, "e261b609570a6ad4484db9fe7cf240b2", {
                            expiresIn: '5min'
                        });
                        delete email.usuario_password; //removendo a senha do retorno
                        return {
                            success: true,
                            token: token,
                        };
                    }
                }
                else {
                    return {
                        success: false,
                        message: 'Senha Não Informada'
                    };
                }
            }
        }
        catch (error) {
            return {
                success: false,
                message: 'Login não localizado',
                error: error
            };
        }
    }
}
exports.loginService = loginService;
