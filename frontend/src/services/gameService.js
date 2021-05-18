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
        this.dispatchAbility = function (applyingUnit, unitAbility, recivingUnit, recivingUnits) { };
        this.callApplyAbility = function (applyingUnitID, unitAbilityName, recivingUnitID, recivingUnitIDs) {
            var applyingUnit = _this.getUnitbyUnitID(applyingUnitID);
            var unitAbility = applyingUnit.abilities.filter(function (ability) { return ability.name === unitAbilityName; })[0];
            var recivingUnit = _this.getUnitbyUnitID(recivingUnitID);
            var recivingUnits = recivingUnitIDs.map(function (recivingUnitID) { return _this.getUnitbyUnitID(recivingUnitID); });
            if (applyingUnit.life > 0)
                _this.game.applyAbility(applyingUnit, unitAbility, recivingUnit, recivingUnits);
            return false;
        };
        this.createUnitID = function (unit) {
            return [unit.player.id, unit.id];
        };
        this.getUnitbyUnitID = function (unitID) {
            return _this.game.units.filter(function (unit) { return unit.player.id == unitID[0] && unit.id == unitID[1]; })[0];
        };
        // public unitCountByPlayer = ():void => {
        //   this.players.map(player => ({
        //     player: player.name,
        //     unitCount: this.game.units.filter(unit => unit.player.name == player.name).length,
        //     unitlife: this.game.units.map(unit => unit.life)
        //   }))
        // }
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
