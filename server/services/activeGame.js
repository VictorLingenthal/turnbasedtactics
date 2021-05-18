"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveGame = void 0;
var graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
var pubSub = new graphql_redis_subscriptions_1.RedisPubSub();
var serverGameService_1 = require("../../frontend/src/services/serverGameService");
var gameStates_model_1 = require("../../frontend/src/model/gameStates.model");
var ActiveGame = /** @class */ (function () {
    function ActiveGame(initialUser, gameID) {
        var _this = this;
        this.getGameData = function () { return ({
            gameID: _this.gameID,
            gameName: _this.gameName,
            playerNames: _this.players.map(function (player) { return player.username; }),
            gameState: _this.gameState
        }); };
        this.join = function (user) {
            if (_this.players.length === 1 &&
                _this.gameState === gameStates_model_1.GameStateEnum.OPEN &&
                _this.players.filter(function (player) { return player.userID === user.userID; }).length === 0) {
                _this.players.push(user);
                _this.gameState = gameStates_model_1.GameStateEnum.STARTED;
                _this.gameService = new serverGameService_1.ServerGameService({
                    gameID: _this.gameID,
                    players: _this.players,
                    gameServiceObserver: _this,
                });
                return _this;
            }
            else
                return null;
        };
        this.endGame = function (winner) {
            _this.gameState = gameStates_model_1.GameStateEnum.FINISHED;
            _this.publish_update();
        };
        this.publish_update = function (startNewGame) {
            return pubSub.publish('UPDATE_GAMELIST', {
                updateGameList: {
                    startNewGame: startNewGame ? startNewGame : false,
                    gameName: _this.gameName,
                    gameID: _this.gameID,
                    gameState: _this.gameState,
                    players: _this.players,
                }
            });
        };
        this.gameID = gameID;
        this.gameName = initialUser.username;
        this.players = [initialUser];
        this.gameState = gameStates_model_1.GameStateEnum.OPEN;
        this.gameService = null;
    }
    return ActiveGame;
}());
exports.ActiveGame = ActiveGame;
