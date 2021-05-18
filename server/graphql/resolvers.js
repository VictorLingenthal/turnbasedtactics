"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var merge_js_1 = __importDefault(require("lodash/merge.js"));
var user_1 = require("./resolvers/user");
var game_1 = require("./resolvers/game");
var gameList_1 = require("./resolvers/gameList");
var initResolvers = {
    Query: {
        name: function () { return 'Peter'; },
    },
    Mutation: {
        addName: function (__, args) { return args.name; },
    },
};
exports.resolvers = merge_js_1.default(initResolvers, user_1.userResolver, game_1.gameResolver, gameList_1.gameListResolver);
