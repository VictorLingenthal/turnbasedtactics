"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var unitModels_1 = require("./unitModels");
var Player = /** @class */ (function () {
    function Player(playerSetup, id) {
        this.name = playerSetup.username;
        this.id = id;
        this.userID = playerSetup.userID;
        // this.unitModels = [Knight, Knight, Healer]
        this.unitModels = [unitModels_1.Knight];
        this.units = [];
        this.alive = true;
    }
    return Player;
}());
exports.Player = Player;
