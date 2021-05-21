"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.authDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type LoginSuccess {\n    userID: String\n    sessionID: String\n    message: String\n  }\n\n  extend type Mutation {\n\n    checkAuth(\n      sessionID: String\n    ): LoginSuccess\n\n    login(\n      username: String\n      password: String\n    ): LoginSuccess\n\n    register(\n      username: String\n      password: String\n      confirmPassword: String\n    ): LoginSuccess\n\n  }\n\n"], ["\n\n  type LoginSuccess {\n    userID: String\n    sessionID: String\n    message: String\n  }\n\n  extend type Mutation {\n\n    checkAuth(\n      sessionID: String\n    ): LoginSuccess\n\n    login(\n      username: String\n      password: String\n    ): LoginSuccess\n\n    register(\n      username: String\n      password: String\n      confirmPassword: String\n    ): LoginSuccess\n\n  }\n\n"])));
var templateObject_1;
