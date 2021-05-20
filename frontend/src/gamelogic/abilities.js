"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Burn = exports.Heal = exports.Attack = void 0;
var abilityTargets_model_1 = require("../model/abilityTargets.model");
var apply = function (applyingUnit, unitAbility, receivingUnits) {
    applyingUnit.currentTurnTimeout = unitAbility.turnTimeout;
    return receivingUnits.map(function (unit) { return (__assign(__assign({}, unit), { life: Math.min(unit.maxlife, unit.life - unitAbility.damage) })); });
};
exports.Attack = {
    name: 'Attack',
    targets: [abilityTargets_model_1.AbilityTargetsEnum.ENEMY],
    apply: apply
};
exports.Heal = {
    name: 'Heal',
    targets: [abilityTargets_model_1.AbilityTargetsEnum.ALLY],
    apply: apply
};
exports.Burn = {
    name: 'Burn',
    targets: [abilityTargets_model_1.AbilityTargetsEnum.ENEMY],
    apply: apply
};
