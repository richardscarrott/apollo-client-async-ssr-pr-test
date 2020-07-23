"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var react_1 = __importDefault(require("react"));
var server_1 = require("react-dom/server");
// import { renderToStringAsync } from "react-render-to-string-async";
var client_1 = require("@apollo/client");
var react_ssr_1 = require("@apollo/react-ssr");
var node_fetch_1 = __importDefault(require("node-fetch"));
var app = express_1.default();
app.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, root, html, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                client = new client_1.ApolloClient({
                    link: new client_1.HttpLink({
                        // Force failure
                        // uri: "https://foo.bar",
                        uri: "https://48p1r2roz4.sse.codesandbox.io",
                        fetch: node_fetch_1.default,
                    }),
                    cache: new client_1.InMemoryCache(),
                    ssrMode: true,
                });
                root = react_1.default.createElement(App, { client: client });
                return [4 /*yield*/, react_ssr_1.getDataFromTree(root)];
            case 1:
                _a.sent();
                html = server_1.renderToString(root);
                res.send("<!doctype html>\n      <html>\n        <head>\n          <title>Apollo Client Async SSR</title>\n        </head>\n        <body>\n          " + html + "\n        <body>\n      </html>\n      ");
                return [3 /*break*/, 3];
            case 2:
                ex_1 = _a.sent();
                console.error(ex_1);
                next(ex_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(6060, function () {
    console.log("Server started on port 6060");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EXCHANGE_RATES = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query GetExchangeRates {\n    rates(currency: \"USD\") {\n      currency\n      rate\n    }\n  }\n"], ["\n  query GetExchangeRates {\n    rates(currency: \"USD\") {\n      currency\n      rate\n    }\n  }\n"])));
var ExchangeRates = function () {
    var _a = client_1.useQuery(EXCHANGE_RATES), loading = _a.loading, error = _a.error, data = _a.data;
    var hasData = !!data && data.rates;
    // 🤔 for some reason data exists but `loading` is true when we perform `renderToString`
    // after `getDataFromTree`?
    if (loading)
        return react_1.default.createElement("p", null,
            "Loading...",
            hasData ? "true" : "false");
    if (error)
        return react_1.default.createElement("p", null, "Error :(");
    return data.rates.map(function (_a) {
        var currency = _a.currency, rate = _a.rate;
        return (react_1.default.createElement("div", { key: currency },
            react_1.default.createElement("p", null,
                currency,
                ": ",
                rate)));
    });
};
var App = function (_a) {
    var client = _a.client;
    console.log("RENDERING");
    return (react_1.default.createElement(client_1.ApolloProvider, { client: client },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "My first Apollo app \uD83D\uDE80"),
            react_1.default.createElement(ExchangeRates, null))));
};
var templateObject_1;
