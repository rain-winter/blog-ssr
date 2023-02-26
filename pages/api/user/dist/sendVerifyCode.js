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
var date_fns_1 = require("date-fns");
var next_1 = require("iron-session/next");
var js_base64_1 = require("js-base64");
var md5_1 = require("md5");
/**
 * ironSeesion 在内存中保存变量
 * 通过这个方式包裹起来 req就存在了session const session =res.sesion
 */
exports["default"] = next_1.withIronSessionApiRoute(sendVerifyCode, config_1.ironOption);
/**
 * api路由 发送验证码 http://localhost:3000/api/user/sendVerifyCode
 * @param req
 * @param res
 */
function sendVerifyCode(req, response) {
    return __awaiter(this, void 0, void 0, function () {
        var session, AccountId, appId, AuthToken, _a, to, templateId, NowDate, SigParameter, Authorization, url, verifyCode, expireMinute;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    session = req.session;
                    AccountId = config_1.verifyOption.AccountId, appId = config_1.verifyOption.appId, AuthToken = config_1.verifyOption.AuthToken;
                    _a = req.body, to = _a.to, templateId = _a.templateId;
                    NowDate = date_fns_1.format(new Date(), 'yyyyMMddHHmmss');
                    SigParameter = md5_1["default"]("" + AccountId + AuthToken + NowDate).toUpperCase();
                    Authorization = js_base64_1.encode(AccountId + ":" + NowDate);
                    url = "https://app.cloopen.com:8883/2013-12-26/Accounts/" + AccountId + "/SMS/TemplateSMS?sig=" + SigParameter;
                    verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                    expireMinute = '5';
                    // 发送请求，获取短信验证码
                    // const res: any = await http.post(
                    //   url,
                    //   {
                    //     to,
                    //     appId,
                    //     templateId,
                    //     datas: [verifyCode, expireMinute],
                    //   },
                    //   { headers: { Authorization } }
                    // )
                    // console.log(verifyCode)
                    // const { statusCode, statusMsg, templateSMS } = res
                    // if (statusCode === '000000') {
                    //   session.verifyCode = verifyCode
                    //   await req.session.save()
                    // }
                    session.verifyCode = verifyCode;
                    console.log(verifyCode);
                    return [4 /*yield*/, session.save()];
                case 1:
                    _b.sent();
                    response.status(200).json({
                        code: 200,
                        data: verifyCode
                    });
                    return [2 /*return*/];
            }
        });
    });
}
