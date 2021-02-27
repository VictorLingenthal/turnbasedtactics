"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Player2 = exports.Player1 = exports.Player = void 0;
var unitModels_1 = require("./unitModels");
var Player = /** @class */ (function () {
    function Player(playerSetup) {
        this.name = playerSetup.name;
        this.id = playerSetup.id;
        this.unitModels = playerSetup.unitModels;
        this.units = [];
        this.alive = true;
    }
    return Player;
}());
exports.Player = Player;
var Player1 = /** @class */ (function (_super) {
    __extends(Player1, _super);
    function Player1() {
        return _super.call(this, {
            name: "Player1",
            id: 1,
            unitModels: [unitModels_1.Knight, unitModels_1.Healer],
            units: [],
            alive: true
        }) || this;
    }
    return Player1;
}(Player));
exports.Player1 = Player1;
var Player2 = /** @class */ (function (_super) {
    __extends(Player2, _super);
    function Player2() {
        return _super.call(this, {
            name: "Player2",
            id: 2,
            unitModels: [unitModels_1.Knight, unitModels_1.Healer],
            units: [],
            alive: true
        }) || this;
    }
    return Player2;
}(Player));
exports.Player2 = Player2;
