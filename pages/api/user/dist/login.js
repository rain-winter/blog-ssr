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
var prisma_1 = require("@/utils/prisma");
var next_1 = require("iron-session/next");
var next_cookie_1 = require("next-cookie");
var prisma = new prisma_1["default"]();
exports["default"] = next_1.withIronSessionApiRoute(login, config_1.ironOption);
function login(req, response) {
    return __awaiter(this, void 0, void 0, function () {
        var session, cookie, _a, phone, verify, _b, identity_type, userauth, user, user;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    session = req.session;
                    cookie = next_cookie_1.Cookie.fromApiRoute(req, response);
                    _a = req.body, phone = _a.phone, verify = _a.verify, _b = _a.identity_type, identity_type = _b === void 0 ? 'phone' : _b;
                    console.log(verify);
                    if (!(String(session.verifyCode) == String(verify))) return [3 /*break*/, 7];
                    return [4 /*yield*/, prisma.userAuth.findFirst({
                            where: {
                                identity_type: identity_type,
                                identifier: phone
                            },
                            include: {
                                User: true
                            }
                        })];
                case 1:
                    userauth = _c.sent();
                    if (!userauth) return [3 /*break*/, 3];
                    user = userauth.User;
                    session.user = user;
                    return [4 /*yield*/, session.save()]; // 保存session
                case 2:
                    _c.sent(); // 保存session
                    func_1.setCookie(cookie, user);
                    response.status(200).json({
                        code: 200,
                        msg: '登录成功',
                        data: userauth
                    });
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, prisma.user.create({
                        data: {
                            nickname: "\u7528\u6237_" + Math.floor(Math.random() * 1000),
                            avatar: '/images/1.png',
                            // 同时创建 userauth表
                            userAuths: {
                                create: [
                                    {
                                        identifier: phone,
                                        identity_type: identity_type,
                                        credential: String(session.verifyCode)
                                    },
                                ]
                            }
                        }
                    })];
                case 4:
                    user = _c.sent();
                    session.user = user;
                    func_1.setCookie(cookie, user);
                    return [4 /*yield*/, session.save()];
                case 5:
                    _c.sent();
                    response.status(200).json({
                        code: 200,
                        msg: '登录成功',
                        data: user
                    });
                    _c.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    response.status(200).json({
                        code: -1,
                        msg: '验证码错误'
                    });
                    _c.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
