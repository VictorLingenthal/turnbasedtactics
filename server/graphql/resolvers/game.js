"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameResolver = void 0;
var apollo_server_1 = require("apollo-server");
var graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
var pubSub = new graphql_redis_subscriptions_1.RedisPubSub();
var serverGameListService_1 = require("../../services/serverGameListService");
exports.gameResolver = {
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
            var _a;
            var game = serverGameListService_1.ServerGameListService.getInstance().getGameByID(args.gameID);
            if ((_a = game === null || game === void 0 ? void 0 : game.gameService) === null || _a === void 0 ? void 0 : _a.checkCurrentPlayerByID(args.userID)) {
                game.gameService.callApplyAbility(args.applyingUnitID, args.unitAbilityName, args.recivingUnitID, args.recivingUnitIDs);
                // console.log('Call PubSub Publish')
                pubSub.publish('SEND_TURN', {
                    sendTurn: {
                        gameID: game.gameID,
                        applyingUnitID: args.applyingUnitID,
                        unitAbilityName: args.unitAbilityName,
                        recivingUnitID: args.recivingUnitID,
                        recivingUnitIDs: args.recivingUnitIDs
                    }
                });
            }
            else {
                console.log("This is not the users turn");
            }
            return 'applyAbility: ' + args.applyingUnitID + " - " + args.unitAbilityName + " - " + args.recivingUnitID + " - " + args.recivingUnitIDs;
        },
    },
    Subscription: {
        sendTurn: {
            subscribe: apollo_server_1.withFilter(function (_, __) {
                return pubSub.asyncIterator('SEND_TURN');
            }, function (payload, variables) {
                return payload.sendTurn.gameID === variables.gameID;
            })
        },
    },
};
