"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var uuid_1 = require("uuid");
var UserService = /** @class */ (function () {
    function UserService() {
        var _this = this;
        this.findUserBySessionID = function (sessionID) {
            return _this.activeUsers.filter(function (activeUser) { return activeUser.sessionID === sessionID; })[0];
        };
        this.findUserByUserID = function (userID) {
            return _this.activeUsers.filter(function (activeUser) { return activeUser.userID === userID; })[0];
        };
        this.findUserByName = function (username) {
            return _this.activeUsers.filter(function (activeUser) { return activeUser.username === username; })[0];
        };
        this.addUser = function (dbUser) {
            var user = _this.findUserByName(dbUser.username);
            if (user === undefined) {
                var newActiveUser = {
                    username: dbUser.username,
                    userID: dbUser.userID,
                    sessionID: uuid_1.v4(),
                    lastlogin: Date.now(),
                };
                _this.activeUsers = __spreadArrays(_this.activeUsers, [newActiveUser]);
                return newActiveUser;
            }
            else
                return null;
        };
        this.activeUsers = [];
    }
    UserService.getInstance = function () {
        if (!UserService.instance)
            UserService.instance = new UserService();
        return UserService.instance;
    };
    return UserService;
}());
exports.UserService = UserService;
