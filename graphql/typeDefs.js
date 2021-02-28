"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type Query {\n    name: String\n    units: [Unit]\n  }\n\n  type Unit {\n    name: String\n    maxlife: Int\n    abilities: [Ability]\n  }\n\n  type Ability {\n    name: String\n    damage: Int\n    target: String\n  }\n\n  type changeTurnInfo {\n    applyingUnitID: [ID]\n    unitAbilityName: String\n    recivingUnitID: [ID]\n    recivingUnitIDs:[[ID]]\n  }\n\n  type Mutation {\n    addName(name:String):String\n    applyAbility(\n      applyingUnitID: [ID]\n      unitAbilityName: String\n      recivingUnitID: [ID]\n      recivingUnitIDs:[[ID]]\n    ):String\n  }\n\n  type Subscription {\n    sendTurn: changeTurnInfo\n  }\n\n"], ["\n\n  type Query {\n    name: String\n    units: [Unit]\n  }\n\n  type Unit {\n    name: String\n    maxlife: Int\n    abilities: [Ability]\n  }\n\n  type Ability {\n    name: String\n    damage: Int\n    target: String\n  }\n\n  type changeTurnInfo {\n    applyingUnitID: [ID]\n    unitAbilityName: String\n    recivingUnitID: [ID]\n    recivingUnitIDs:[[ID]]\n  }\n\n  type Mutation {\n    addName(name:String):String\n    applyAbility(\n      applyingUnitID: [ID]\n      unitAbilityName: String\n      recivingUnitID: [ID]\n      recivingUnitIDs:[[ID]]\n    ):String\n  }\n\n  type Subscription {\n    sendTurn: changeTurnInfo\n  }\n\n"])));
var templateObject_1;
