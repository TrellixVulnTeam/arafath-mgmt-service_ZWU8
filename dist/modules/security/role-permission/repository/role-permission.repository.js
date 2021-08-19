"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionRepository = void 0;
const typeorm_1 = require("typeorm");
const role_permission_entity_1 = require("../entities/role-permission.entity");
let RolePermissionRepository = class RolePermissionRepository extends typeorm_1.Repository {
};
RolePermissionRepository = __decorate([
    typeorm_1.EntityRepository(role_permission_entity_1.RolePermission)
], RolePermissionRepository);
exports.RolePermissionRepository = RolePermissionRepository;
//# sourceMappingURL=role-permission.repository.js.map