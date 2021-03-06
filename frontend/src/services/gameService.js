"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
var game_1 = require("../gamelogic/game");
var player_1 = require("../gamelogic/player");
var GameService = /** @class */ (function () {
    function GameService(args) {
        var _this = this;
        this.initPlayers = function (args) {
            var _a;
            (_a = args === null || args === void 0 ? void 0 : args.players) === null || _a === void 0 ? void 0 : _a.map(function (playerstub, idx) { return _this.players[idx] = new player_1.Player(playerstub, idx + 1); });
        };
        this.checkCurrentPlayerByID = function (userID) {
            return userID === _this.game.currentPlayer.userID;
        };
        this.dispatchAbility = function (applyingUnit, unitAbility, receivingUnit, receivingUnits) { };
        this.callApplyAbility = function (applyingUnitID, unitAbilityName, receivingUnitID, receivingUnitIDs) {
            var applyingUnit = _this.getUnitbyUnitID(applyingUnitID);
            var unitAbility = applyingUnit.abilities.filter(function (ability) { return ability.name === unitAbilityName; })[0];
            var receivingUnit = _this.getUnitbyUnitID(receivingUnitID);
            var receivingUnits = receivingUnitIDs.map(function (receivingUnitID) { return _this.getUnitbyUnitID(receivingUnitID); });
            return _this.game.applyAbility(applyingUnit, unitAbility, receivingUnit, receivingUnits);
        };
        this.createUnitID = function (unit) {
            return [unit.player.id, unit.id];
        };
        this.getUnitbyUnitID = function (unitID) {
            return _this.game.units.filter(function (unit) { return unit.player.id == unitID[0] && unit.id == unitID[1]; })[0];
        };
        this.endGame = function (winner) { var _a; return (_a = _this.gameServiceObserver) === null || _a === void 0 ? void 0 : _a.endGame(winner); };
        this.players = [];
        this.initPlayers(args);
        this.gameServiceObserver = args.gameServiceObserver;
        this.gameID = (args === null || args === void 0 ? void 0 : args.gameID) || '0';
        this.game = new game_1.Game({
            gameService: this,
            players: this.players,
        });
    }
    return GameService;
}());
exports.GameService = GameService;
