"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Witch = exports.Healer = exports.Knight = exports.GameUnit = void 0;
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
    maxlife: 40,
    abilities: [{
            name: abilities_1.Attack.name,
            damage: 12,
            turnTimeout: 1,
            targets: ['Clicked'],
            ability: abilities_1.Attack
        }]
};
exports.Healer = {
    name: 'Healer',
    maxlife: 20,
    abilities: [{
            name: abilities_1.Heal.name,
            damage: -6,
            targets: ['All_by_Player'],
            turnTimeout: 3,
            ability: abilities_1.Heal
        }]
};
exports.Witch = {
    name: 'Witch',
    maxlife: 20,
    abilities: [{
            name: abilities_1.Burn.name,
            damage: 10,
            turnTimeout: 4,
            targets: ['All_by_Enemy'],
            ability: abilities_1.Burn
        }]
};
