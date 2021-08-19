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
exports.ResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ResponseDto {
    constructor(success, message, details, data) {
        this.success = true;
        this.message = 'Operation Successfully.';
        this.success = success;
        this.message = message;
        this.details = details;
        this.data = data;
    }
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], ResponseDto.prototype, "success", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], ResponseDto.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ResponseDto.prototype, "details", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], ResponseDto.prototype, "data", void 0);
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map