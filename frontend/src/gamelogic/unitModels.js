"use strict";
exports.__esModule = true;
exports.Healer = exports.Knight = exports.GameUnit = void 0;
var abilities_1 = require("./abilities");
var GameUnit = /** @class */ (function () {
    function GameUnit(data) {
        this.name = data.name;
        this.maxlife = data.maxlife;
        this.abilities = data.abilities;
    }
    return GameUnit;
}());
exports.GameUnit = GameUnit;
exports.Knight = {
    name: 'Knight',
    maxlife: 50,
    abilities: [{
            name: abilities_1.Attack.name,
            damage: 10,
            targets: ['Clicked'],
            ability: abilities_1.Attack
        }]
};
exports.Healer = {
    name: 'Healer',
    maxlife: 30,
    abilities: [{
            name: abilities_1.Heal.name,
            damage: 6,
            targets: ['All_by_Player'],
            ability: abilities_1.Heal
        }]
};
