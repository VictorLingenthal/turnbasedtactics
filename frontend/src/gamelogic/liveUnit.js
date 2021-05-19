"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameUnit = void 0;
var GameUnit = /** @class */ (function () {
    function GameUnit(id, player, unitModel) {
        this.id = id;
        this.player = player;
        console.log('Live unit');
        this.name = unitModel.name;
        this.life = unitModel.maxlife;
        this.currentTurnTimeout = 0;
        this.maxlife = unitModel.maxlife;
        this.abilities = unitModel.abilities;
    }
    return GameUnit;
}());
exports.GameUnit = GameUnit;
