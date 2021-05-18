"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var auth_1 = require("./typedefs/auth");
var game_1 = require("./typedefs/game");
var gameList_1 = require("./typedefs/gameList");
exports.typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type Query {\n    name: String\n    units: [Unit]\n  }\n\n  type Mutation {\n    addName(name:String):String\n  }\n\n  ", "\n  ", "\n  ", "\n\n\n"], ["\n\n  type Query {\n    name: String\n    units: [Unit]\n  }\n\n  type Mutation {\n    addName(name:String):String\n  }\n\n  ", "\n  ", "\n  ", "\n\n\n"])), auth_1.authDefs, game_1.gameDefs, gameList_1.gameListDefs);
var templateObject_1;
