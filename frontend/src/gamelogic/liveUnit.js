"use strict";
exports.__esModule = true;
exports.GameUnit = void 0;
var GameUnit = /** @class */ (function () {
    function GameUnit(id, player, unitModel) {
        this.id = id;
        this.player = player;
        console.log('Live unit');
        this.name = unitModel.name;
        this.life = unitModel.maxlife;
        this.maxlife = unitModel.maxlife;
        this.abilities = unitModel.abilities;
    }
    return GameUnit;
}());
exports.GameUnit = GameUnit;
