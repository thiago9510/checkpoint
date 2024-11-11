"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroPontoUsuariosEntity = void 0;
const typeorm_1 = require("typeorm");
const usuariosEntity_1 = require("./usuariosEntity");
let RegistroPontoUsuariosEntity = class RegistroPontoUsuariosEntity {
};
exports.RegistroPontoUsuariosEntity = RegistroPontoUsuariosEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], RegistroPontoUsuariosEntity.prototype, "registroPonto_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", String)
], RegistroPontoUsuariosEntity.prototype, "registroPonto_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], RegistroPontoUsuariosEntity.prototype, "registroPonto_chegada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], RegistroPontoUsuariosEntity.prototype, "registroPonto_inicio_intervalo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], RegistroPontoUsuariosEntity.prototype, "registroPonto_fim_intervalo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date
    //Relacionamento com a tabela UsuarioEntity
    //OBS nessa relação é necessário fazer o find do usuario e passar a entidade 
    )
], RegistroPontoUsuariosEntity.prototype, "registroPonto_saida", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuariosEntity_1.UsuarioEntity, usuario => usuario.usuario_id, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "usuario_id" }),
    __metadata("design:type", usuariosEntity_1.UsuarioEntity)
], RegistroPontoUsuariosEntity.prototype, "usuario", void 0);
exports.RegistroPontoUsuariosEntity = RegistroPontoUsuariosEntity = __decorate([
    (0, typeorm_1.Entity)('RegistroPontoUsuarios')
], RegistroPontoUsuariosEntity);
