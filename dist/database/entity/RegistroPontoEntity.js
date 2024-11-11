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
exports.RegistroPontoEntity = void 0;
const typeorm_1 = require("typeorm");
const usuariosEntity_1 = require("./usuariosEntity");
let RegistroPontoEntity = class RegistroPontoEntity {
};
exports.RegistroPontoEntity = RegistroPontoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], RegistroPontoEntity.prototype, "registroPonto_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Entrada', 'Saida', 'Inicio_intervalo', 'Fim_intervalo'], default: 'Entrada', nullable: false }),
    __metadata("design:type", String)
], RegistroPontoEntity.prototype, "registroPonto_tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuariosEntity_1.UsuarioEntity, usuario => usuario.usuario_id, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "usuario_id" }),
    __metadata("design:type", usuariosEntity_1.UsuarioEntity)
], RegistroPontoEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_At' }),
    __metadata("design:type", Date)
], RegistroPontoEntity.prototype, "updated_At", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_At' }),
    __metadata("design:type", Date)
], RegistroPontoEntity.prototype, "created_At", void 0);
exports.RegistroPontoEntity = RegistroPontoEntity = __decorate([
    (0, typeorm_1.Entity)('RegistroPonto')
], RegistroPontoEntity);
