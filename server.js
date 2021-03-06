"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var apollo_server_1 = require("apollo-server");
var mongoose_1 = __importDefault(require("mongoose"));
var http_1 = require("http");
var dotenv_1 = __importDefault(require("dotenv"));
var typeDefs_1 = require("./server/graphql/typeDefs");
var resolvers_1 = require("./server/graphql/resolvers");
var pubsub = new apollo_server_1.PubSub();
dotenv_1.default.config();
mongoose_1.default
    .connect((process.env.ATLAS_URI), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log("mongodb connected successfully");
})
    .catch(function (err) {
    console.log(err);
});
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: function (_a) {
        var req = _a.req, res = _a.res;
        return ({ req: req, res: res, pubsub: pubsub });
    }
});
var app = express_1.default();
app.use(express_1.default.static(__dirname + "/frontend/build"));
server.applyMiddleware({ app: app });
var httpServer = http_1.createServer(app);
server.installSubscriptionHandlers(httpServer);
var PORT = process.env.PORT || 4444;
httpServer.listen({ port: PORT }, function () {
    console.log("Server is running in port " + PORT);
});
