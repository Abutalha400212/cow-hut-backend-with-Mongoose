"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRole = exports.UserSearchableFields = exports.UserFilterFields = void 0;
exports.UserFilterFields = [
    "searchTerm",
    "name.firstName",
    "name.lastName",
    "phoneNumber",
];
exports.UserSearchableFields = [
    "location",
    "name.firstName",
    "name.lastName",
    "role",
];
exports.userRole = ["buyer", "seller"];
