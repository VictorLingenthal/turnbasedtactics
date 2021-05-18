"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameListDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.gameListDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type PlayerStub {\n    username: String\n    userID: ID\n  }\n\n  type GameStub {\n    startNewGame: Boolean\n    gameName: String\n    gameID: ID\n    gameState: ID\n    players: [PlayerStub]\n  }\n\n  extend type Query {\n    getGameList: [GameStub]\n  }\n\n  extend type Mutation {\n    openGame(\n      userID: ID\n    ): Boolean\n    joinGame(\n      userID: ID\n      gameID: ID\n    ): Boolean\n  }\n\n  extend type Subscription {\n    updateGameList: GameStub\n  }\n\n"], ["\n\n  type PlayerStub {\n    username: String\n    userID: ID\n  }\n\n  type GameStub {\n    startNewGame: Boolean\n    gameName: String\n    gameID: ID\n    gameState: ID\n    players: [PlayerStub]\n  }\n\n  extend type Query {\n    getGameList: [GameStub]\n  }\n\n  extend type Mutation {\n    openGame(\n      userID: ID\n    ): Boolean\n    joinGame(\n      userID: ID\n      gameID: ID\n    ): Boolean\n  }\n\n  extend type Subscription {\n    updateGameList: GameStub\n  }\n\n"])));
var templateObject_1;
