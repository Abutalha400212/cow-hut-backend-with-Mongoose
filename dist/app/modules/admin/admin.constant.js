"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRole = exports.AdminFilterFields = exports.AdminSearchableFields = void 0;
exports.AdminSearchableFields = [
    "location",
    "name.firstName",
    "name.lastName",
    "role",
];
exports.AdminFilterFields = [
    "searchTerm",
    "name.firstName",
    "name.lastName",
    "phoneNumber",
];
exports.adminRole = ["admin"];
