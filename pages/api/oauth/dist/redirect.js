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
exports.__esModule = true;
var config_1 = require("@/config");
var func_1 = require("@/utils/func");
var http_1 = require("@/utils/http");
var prisma_1 = require("@/utils/prisma");
var next_1 = require("iron-session/next");
var next_cookie_1 = require("next-cookie");
exports["default"] = next_1.withIronSessionApiRoute(redirect, config_1.ironOption);
function redirect(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var prisma, session, cookie, code, githubClientID, githubSecrect, url, res, access_token, githubUserInfo, userAuth, user, _a, _b, login, _c, avatar_url, user;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    prisma = new prisma_1["default"]();
                    session = request.session;
                    cookie = next_cookie_1.Cookie.fromApiRoute(request, response);
                    code = ((request === null || request === void 0 ? void 0 : request.query) || {}).code;
                    console.log('--------code------');
                    console.log(code);
                    console.log('--------------');
                    githubClientID = config_1.oauthOptions.githubClientID;
                    githubSecrect = config_1.oauthOptions.githubSecrect;
                    url = "https://github.com/login/oauth/access_token";
                    return [4 /*yield*/, http_1["default"].post(url, {
                            client_id: githubClientID,
                            client_secret: githubSecrect,
                            code: code
                        }, {
                            headers: {
                                Accept: 'application/json'
                            }
                        })];
                case 1:
                    res = _d.sent();
                    console.log('111111res-----11111111111');
                    console.log(res);
                    console.log('1111111res--1111111111');
                    access_token = res.access_token;
                    return [4 /*yield*/, http_1["default"].get('https://api.github.com/user', {
                            headers: {
                                Accept: 'application/json',
                                Authorization: "Bearer " + access_token
                            }
                        })];
                case 2:
                    githubUserInfo = _d.sent();
                    console.log(githubUserInfo);
                    return [4 /*yield*/, prisma.userAuth.findFirst({
                            where: {
                                identity_type: 'github',
                                identifier: githubClientID
                            },
                            include: {
                                User: true
                            }
                        })];
                case 3:
                    userAuth = _d.sent();
                    console.log('userauth');
                    console.log(userAuth);
                    console.log('userauth');
                    if (!userAuth) return [3 /*break*/, 5];
                    // 之前登录过的用户，直接从user获取数据，并且更新credential
                    userAuth.credential = access_token;
                    user = userAuth.User;
                    console.log('--------------------');
                    console.log(userAuth.User);
                    console.log('--------------------');
                    session.user = user;
                    return [4 /*yield*/, session.save()];
                case 4:
                    _d.sent();
                    func_1.setCookie(cookie, user);
                    response.writeHead(302, {
                        Location: '/'
                    });
                    return [3 /*break*/, 7];
                case 5:
                    _a = githubUserInfo, _b = _a.login, login = _b === void 0 ? '' : _b, _c = _a.avatar_url, avatar_url = _c === void 0 ? '' : _c;
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                nickname: login,
                                avatar: avatar_url,
                                // 同时创建 userauth表
                                userAuths: {
                                    create: [
                                    // {
                                    //   identifier: githubClientID,
                                    //   identity_type: 'github',
                                    //   credential: access_token,
                                    // },
                                    ]
                                }
                            }
                        })];
                case 6:
                    user = _d.sent();
                    console.log('------------');
                    console.log(user);
                    console.log('------------');
                    _d.label = 7;
                case 7:
                    // response.writeHead(302, {
                    //   Location: '/'
                    // });
                    response.status(200).json({
                        code: 200,
                        data: { access_token: access_token },
                        msg: '登录成功'
                    });
                    return [2 /*return*/];
            }
        });
    });
}
