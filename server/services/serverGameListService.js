"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerGameListService = void 0;
var activeGame_1 = require("./activeGame");
var userService_1 = require("./../services/userService");
var gameStates_model_1 = require("../../frontend/src/model/gameStates.model");
var uuid_1 = require("uuid");
var ServerGameListService = /** @class */ (function () {
    function ServerGameListService() {
        var _this = this;
        this.getGameList = function () { return _this.activeGames; };
        this.getGameByID = function (id) {
            return _this.activeGames.filter(function (game) { return game.gameID === id; })[0];
        };
        this.startGame = function (user) {
            var newgame = new activeGame_1.ActiveGame(user, uuid_1.v4());
            _this.activeGames = __spreadArrays(_this.activeGames, [newgame]);
            return newgame;
        };
        this.joinGame = function (gameID, userID) {
            var userService = userService_1.UserService.getInstance();
            var user = userService.findUserByUserID(userID);
            var activeGame = _this.getGameByID(gameID);
            if (activeGame.gameState === gameStates_model_1.GameStateEnum.OPEN) {
                return activeGame.join(user);
            }
            else
                return null;
        };
        this.activeGames = [];
    }
    ServerGameListService.getInstance = function () {
        if (!ServerGameListService.instance)
            ServerGameListService.instance = new ServerGameListService();
        return ServerGameListService.instance;
    };
    return ServerGameListService;
}());
exports.ServerGameListService = ServerGameListService;
