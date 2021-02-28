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
exports.Heal = exports.Attack = void 0;
exports.Attack = {
    name: 'Attack',
    targets: ['Enemy'],
    apply: function (applyingUnit, unitAbility, recivingUnits) { return (recivingUnits.map(function (unit) { return (__assign(__assign({}, unit), { life: Math.min(unit.maxlife, unit.life - unitAbility.damage) })); })); }
};
exports.Heal = {
    name: 'Heal',
    targets: ['Ally'],
    apply: function (applyingUnit, unitAbility, recivingUnits) { return (recivingUnits.map(function (unit) { return (__assign(__assign({}, unit), { life: Math.min(unit.maxlife, unit.life + unitAbility.damage) })); })); }
};