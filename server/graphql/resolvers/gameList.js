"use strict";
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// const pubSub = new RedisPubSub();
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameListResolver = void 0;
var redisclient_1 = require("../../../frontend/src/services/redisclient");
var serverGameListService_1 = require("./../../services/serverGameListService");
var userService_1 = require("./../../services/userService");
exports.gameListResolver = {
    Query: {
        getGameList: function () { return serverGameListService_1.ServerGameListService.getInstance().getGameList(); }
    },
    Mutation: {
        openGame: function (__, args) {
            var serverGameListService = serverGameListService_1.ServerGameListService.getInstance();
            var userService = userService_1.UserService.getInstance();
            var user = userService.findUserByUserID(args.userID);
            var newgame = serverGameListService.startGame(user);
            newgame.publish_update();
        },
        joinGame: function (__, args) {
            var serverGameListService = serverGameListService_1.ServerGameListService.getInstance();
            var newgame = serverGameListService.joinGame(args.gameID, args.userID);
            if (newgame)
                newgame.publish_update(true);
        },
    },
    Subscription: {
        updateGameList: {
            subscribe: function (_, __) { return redisclient_1.pubSub.asyncIterator(['UPDATE_GAMELIST']); }
        },
    }
};
