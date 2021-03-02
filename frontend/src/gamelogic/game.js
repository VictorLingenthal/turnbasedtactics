"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var liveUnit_1 = require("./liveUnit");
var Game = /** @class */ (function () {
    function Game(args) {
        var _this = this;
        this.initializePlayers = function () {
            return _this.players.map(function (player) { return player.units = _this.initializeUnits(player); });
        };
        this.initializeUnits = function (player) {
            var playerUnits = player.unitModels.map(function (unitModel, idx) { return new liveUnit_1.GameUnit(idx, player, unitModel); });
            _this.units = __spreadArrays(_this.units, playerUnits);
            return playerUnits;
        };
        this.insertUnits = function (units) {
            var _loop_1 = function (i) {
                var updatedUnit = units[i];
                _this.units = _this.units.map(function (unit) { return (updatedUnit.id === unit.id && updatedUnit.player.id === unit.player.id) ? updatedUnit : unit; });
            };
            for (var i = 0; i < units.length; i++) {
                _loop_1(i);
            }
        };
        this.applyAbility = function (applyingUnit, unitAbility, recivingUnit, recivingUnits) {
            switch (unitAbility.targets[0]) {
                case 'Clicked': {
                    var updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, [recivingUnit]);
                    _this.insertUnits(updatedUnits);
                    _this.changeTurn();
                    return;
                }
                case 'All_by_Player': {
                    var updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, recivingUnits);
                    _this.insertUnits(updatedUnits);
                    _this.changeTurn();
                    return;
                }
                default: {
                    _this.changeTurn();
                    return;
                }
            }
        };
        this.getUnitsByPlayer = function (player) {
            return _this.units.filter(function (unit) { return unit.player === player; });
        };
        this.changeTurn = function () {
            if (_this.checkForWinner()) {
                console.log('TBD: proclaim winner');
            }
            else {
                _this.switchToNextPlayer();
                _this.turn++;
            }
        };
        this.switchToNextPlayer = function () {
            var players_left = _this.players.length;
            var idxCurrentPlayerInc = _this.players.indexOf(_this.currentPlayer) + 1;
            var idxNextPlayer = players_left === idxCurrentPlayerInc ? 0 : idxCurrentPlayerInc;
            _this.currentPlayer = _this.players[idxNextPlayer];
        };
        this.checkForWinner = function () {
            console.log('TBD: are there losers?');
            return false;
        };
        this.players = args.players;
        this.turn = args.turn || 0;
        this.currentPlayer = args.currentPlayer || args.players[0];
        this.units = [];
        this.initializePlayers();
    }
    return Game;
}());
exports.Game = Game;
