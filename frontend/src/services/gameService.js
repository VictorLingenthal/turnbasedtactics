"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
var game_1 = require("../gamelogic/game");
var player_1 = require("../gamelogic/player");
var GameService = /** @class */ (function () {
    function GameService() {
        var _this = this;
        this.dispatchAbility = function (applyingUnit, unitAbility, recivingUnit, recivingUnits) { };
        this.callApplyAbility = function (applyingUnitID, unitAbilityName, recivingUnitID, recivingUnitIDs) {
            console.log('callApplyAbility');
            var applyingUnit = _this.getUnitbyUnitID(applyingUnitID);
            // console.log(applyingUnit)
            var unitAbility = applyingUnit.abilities.filter(function (ability) { return ability.name === unitAbilityName; })[0];
            // console.log(unitAbility)
            var recivingUnit = _this.getUnitbyUnitID(recivingUnitID);
            // console.log(recivingUnit)
            var recivingUnits = recivingUnitIDs.map(function (recivingUnitID) { return _this.getUnitbyUnitID(recivingUnitID); });
            // console.log(recivingUnits)
            _this.game.applyAbility(applyingUnit, unitAbility, recivingUnit, recivingUnits);
            return false;
        };
        this.createUnitID = function (unit) {
            return [unit.player.id, unit.id];
        };
        this.getUnitbyUnitID = function (unitID) {
            return _this.game.units.filter(function (unit) { return unit.player.id == unitID[0] && unit.id == unitID[1]; })[0];
        };
        this.unitCountByPlayer = function () {
            console.log('unitCountByPlayer');
            var unitCountByPlayer = _this.players.map(function (player) { return ({
                player: player.name,
                unitCount: _this.game.units.filter(function (unit) { return unit.player.name == player.name; }).length,
                unitlife: _this.game.units.map(function (unit) { return unit.life; })
            }); });
            console.log(unitCountByPlayer);
            console.log('currentTurn: ' + _this.game.turn);
        };
        this.players = [new player_1.Player1, new player_1.Player2];
        this.game = new game_1.Game({
            players: this.players
        });
    }
    return GameService;
}());
exports.GameService = GameService;
