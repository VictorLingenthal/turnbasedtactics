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
        this.initializeGame = function () {
            return _this.players.map(function (player) { return player.units = _this.initializeUnits(player); });
        };
        this.initializeUnits = function (player) {
            var playerUnits = player.unitModels.map(function (unitModel, idx) { return new liveUnit_1.GameUnit(idx, player, unitModel); });
            _this.units = __spreadArrays(_this.units, playerUnits);
            return playerUnits;
        };
        this.insertUnits = function (units) {
            for (var i in units)
                _this.units = _this.units.map(function (unit) { return (units[i].id === unit.id && units[i].player.id === unit.player.id) ? units[i] : unit; });
        };
        this.filterDeadUnits = function (units) {
            return units.filter(function (unit) { return unit.life != 0; });
        };
        this.applyAbility = function (applyingUnit, unitAbility, receivingUnit, receivingUnits) {
            if (applyingUnit.currentTurnTimeout > 0 ||
                applyingUnit.life < 1)
                return false;
            switch (unitAbility.targets[0]) {
                case 'Clicked': {
                    var updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, _this.filterDeadUnits([receivingUnit]));
                    _this.insertUnits(updatedUnits);
                    _this.changeTurn();
                    return true;
                }
                case 'All_by_Player': {
                    var updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, _this.filterDeadUnits(receivingUnits));
                    _this.insertUnits(updatedUnits);
                    _this.changeTurn();
                    return true;
                }
                case 'All_by_Enemy': {
                    var updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, _this.filterDeadUnits(receivingUnits));
                    _this.insertUnits(updatedUnits);
                    _this.changeTurn();
                    return true;
                }
                default: {
                    _this.changeTurn();
                    return true;
                }
            }
        };
        this.getUnitsByPlayer = function (player) {
            return _this.units.filter(function (unit) { return unit.player === player; });
        };
        this.changeTurn = function () {
            var _a;
            if (_this.checkForWinner()) {
                (_a = _this.gameService) === null || _a === void 0 ? void 0 : _a.endGame(_this.winner);
            }
            else {
                _this.changeTurnTimeouts();
                _this.switchToNextPlayer();
                _this.turn++;
            }
        };
        this.changeTurnTimeouts = function () {
            return _this.getUnitsByPlayer(_this.currentPlayer).map(function (unit) {
                return unit.currentTurnTimeout > 0 ? unit.currentTurnTimeout-- : unit;
            });
        };
        this.switchToNextPlayer = function () {
            var players_left = _this.players.length;
            var idxCurrentPlayerInc = _this.players.indexOf(_this.currentPlayer) + 1;
            var idxNextPlayer = players_left === idxCurrentPlayerInc ? 0 : idxCurrentPlayerInc;
            _this.currentPlayer = _this.players[idxNextPlayer];
        };
        this.checkForWinner = function () {
            var players_to_remove = [];
            for (var i in _this.remaining_players) {
                var remainingUnits = _this.units.filter(function (unit) {
                    return unit.life > 0 &&
                        unit.player.id === _this.remaining_players[i].id;
                }).length;
                if (remainingUnits === 0)
                    players_to_remove.push(_this.remaining_players[i]);
            }
            for (var i in players_to_remove)
                _this.remaining_players = _this.remaining_players.filter(function (player) { return player.name != players_to_remove[i].name; });
            if (_this.remaining_players.length === 1) {
                _this.winner = _this.remaining_players[0];
                return true;
            }
            return false;
        };
        this.getWinner = function () { return _this.winner; };
        this.gameService = args.gameService;
        this.players = args.players;
        this.remaining_players = this.players;
        this.turn = args.turn || 0;
        this.currentPlayer = args.currentPlayer || args.players[0];
        this.units = [];
        this.initializeGame();
    }
    return Game;
}());
exports.Game = Game;
