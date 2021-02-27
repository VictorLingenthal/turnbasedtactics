"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
var game_1 = require("../gamelogic/game");
var player_1 = require("../gamelogic/player");
var GameService = /** @class */ (function () {
    function GameService() {
        var _this = this;
        this.applyAbility = function (applyingUnit, unitAbility, recivingUnit, recivingUnits) { return recivingUnits; };
        this.callApplyAbility = function (applyingUnitID, unitAbilityName, recivingUnit, recivingUnits) { return false; };
        this.createUnitID = function (unit) {
            return [unit.player.id, unit.id];
        };
        this.getUnitbyUnitID = function (unitID) {
            return _this.game.units.filter(function (unit) { return unit.player.id == unitID[0] && unit.id == unitID[1]; })[0];
        };
        this.players = [new player_1.Player1, new player_1.Player2];
        this.game = new game_1.Game({
            players: this.players
        });
    }
    return GameService;
}());
exports.GameService = GameService;
