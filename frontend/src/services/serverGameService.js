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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerGameService = void 0;
var gameService_1 = require("./gameService");
var ServerGameService = /** @class */ (function (_super) {
    __extends(ServerGameService, _super);
    function ServerGameService() {
        var _this = _super.call(this) || this;
        _this.applyAbility = function (applyingUnit, unitAbility, recivingUnit, recivingUnits) { return _this.game.applyAbility(applyingUnit, unitAbility, recivingUnit, recivingUnits); };
        _this.callApplyAbility = function (applyingUnitID, unitAbilityName, recivingUnitID, recivingUnitIDs) {
            var applyingUnit = _this.getUnitbyUnitID(applyingUnitID);
            console.log(applyingUnit);
            var unitAbility = applyingUnit.abilities.filter(function (ability) { return ability.name === unitAbilityName; })[0];
            console.log(unitAbility);
            var recivingUnit = _this.getUnitbyUnitID(recivingUnitID);
            console.log(recivingUnit);
            var recivingUnits = recivingUnitIDs.map(function (recivingUnitID) { return _this.getUnitbyUnitID(recivingUnitID); });
            console.log(recivingUnits);
            _this.applyAbility(applyingUnit, unitAbility, recivingUnit, recivingUnits);
            return false;
        };
        return _this;
    }
    return ServerGameService;
}(gameService_1.GameService));
exports.ServerGameService = ServerGameService;
