"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var uuid_1 = require("uuid");
var user_model_1 = __importDefault(require("../models/user.model"));
var mongoose_1 = __importDefault(require("mongoose"));
var UserService = /** @class */ (function () {
    function UserService() {
        var _this = this;
        this.checkAuth = function (sessionID) {
            var auth = {
                userID: null,
                sessionID: null,
                message: "Session expired"
            };
            var userLoggedin = _this.findUserBySessionID(sessionID);
            if (userLoggedin) {
                auth.userID = userLoggedin.userID;
                auth.message = "Welcome back " + userLoggedin.username;
            }
            else {
                console.log('No user with that sessionID');
            }
            return auth;
        };
        this.findUserBySessionID = function (sessionID) {
            return _this.activeUsers.filter(function (activeUser) { return activeUser.sessionID === sessionID; })[0];
        };
        this.findUserByUserID = function (userID) {
            return _this.activeUsers.filter(function (activeUser) { return activeUser.userID === userID; })[0];
        };
        this.findUserByUsername = function (username) {
            return _this.activeUsers.filter(function (activeUser) { return activeUser.username === username; })[0];
        };
        this.addUser = function (dbUser) {
            var user = _this.findUserByUsername(dbUser.username);
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
    UserService.prototype.loginUser = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var login, user, newActiveUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login = {
                            userID: null,
                            sessionID: null,
                            message: "No login Message set"
                        };
                        if (mongoose_1.default.connection.readyState != 1) {
                            login.message = "Database Server not connected, please try again later";
                            return [2 /*return*/, login];
                        }
                        return [4 /*yield*/, user_model_1.default.findOne({ username: args.username })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            login.message = "No user by that name";
                        else if (user.password !== args.password)
                            login.message = "Passwords do not match";
                        else {
                            newActiveUser = this.addUser(user);
                            if (newActiveUser) {
                                login.message = newActiveUser.username + " logged in successfully ";
                                login.userID = newActiveUser.userID;
                                login.sessionID = newActiveUser.sessionID;
                            }
                            else
                                login.message = args.username + " already logged in";
                        }
                        return [2 /*return*/, login];
                }
            });
        });
    };
    UserService.prototype.registerUser = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var register, user, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        register = {
                            userID: null,
                            sessionID: null,
                            message: "No register Message set"
                        };
                        if (mongoose_1.default.connection.readyState != 1) {
                            register.message = "Database Server not connected, please try again later";
                            return [2 /*return*/, register];
                        }
                        return [4 /*yield*/, user_model_1.default.findOne({ username: args.username })];
                    case 1:
                        user = _a.sent();
                        if (!(args.password !== args.confirmPassword)) return [3 /*break*/, 2];
                        register.message = "Passwords do not match";
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(args.username.length < 3)) return [3 /*break*/, 3];
                        register.message = "username too short";
                        return [3 /*break*/, 6];
                    case 3:
                        if (!user) return [3 /*break*/, 4];
                        register.message = "username already taken";
                        return [3 /*break*/, 6];
                    case 4:
                        newUser = new user_model_1.default({
                            username: args.username,
                            password: args.password,
                            userID: uuid_1.v4()
                        });
                        return [4 /*yield*/, newUser.save()];
                    case 5:
                        _a.sent();
                        register.message = 'Newuser "' + newUser.username + '" created succesfully!';
                        register.userID = newUser.userID;
                        _a.label = 6;
                    case 6: return [2 /*return*/, register];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
