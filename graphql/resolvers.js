"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var merge_js_1 = __importDefault(require("lodash/merge.js"));
var apollo_server_1 = require("apollo-server");
var pubsub = new apollo_server_1.PubSub();
var serverGameService_1 = require("../frontend/src/services/serverGameService");
var serverGameService = new serverGameService_1.ServerGameService;
var initResolvers = {
    Query: {
        name: function () { return 'Peter'; },
        units: function () { return [{
                name: 'knight',
                maxlife: 40,
                abilities: [{
                        name: 'Attack',
                        damage: 5,
                        target: 'enemy',
                    }]
            }]; }
    },
    Mutation: {
        addName: function (__, args) { return args.name; },
        applyAbility: function (__, args) {
            console.log('applyAbility');
            console.log(pubsub.publish);
            pubsub.publish('SEND_TURN', {
                sendTurn: {
                    applyingUnitID: args.applyingUnitID,
                    unitAbilityName: args.unitAbilityName,
                    recivingUnitID: args.recivingUnitID,
                    recivingUnitIDs: args.recivingUnitIDs
                }
            });
            serverGameService.callApplyAbility(args.applyingUnitID, args.unitAbilityName, args.recivingUnitID, args.recivingUnitIDs);
            return 'applyAbility: ' + args.applyingUnitID + " - " + args.unitAbilityName + " - " + args.recivingUnitID + " - " + args.recivingUnitIDs;
        },
    },
    Subscription: {
        sendTurn: {
            subscribe: function (_, __) {
                console.log('Send Turn');
                return pubsub.asyncIterator('SEND_TURN');
            },
        },
    },
};
exports.resolvers = merge_js_1.default(initResolvers);
