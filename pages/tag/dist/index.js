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
var store_1 = require("@/store");
var api_1 = require("@/utils/api");
var func_1 = require("@/utils/func");
var http_1 = require("@/utils/http");
// 用于渲染图标
// import * as ANTD_ICONS from '@ant-design/icons'
var antd_1 = require("antd");
var react_1 = require("react");
var index_module_scss_1 = require("./index.module.scss");
var TabContent = function (row) {
    var _a;
    var data = row.data;
    var followOrAll = data.followTags ? data.followTags : data.allTags;
    var store = store_1.useStore();
    var userId = JSON.parse((_a = store === null || store === void 0 ? void 0 : store.user) === null || _a === void 0 ? void 0 : _a.userInfo).id;
    /**
     * 取关
     * @param id
     */
    function handleUnFollow(tagid) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, http_1["default"].post(api_1["default"].follow, { type: 'unfollow', tagid: tagid })];
                    case 1:
                        res = _a.sent();
                        antd_1.message.info('取关成功');
                        location.reload();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * 关注
     * @param id
     */
    function handleFollow(tagid) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, http_1["default"].post(api_1["default"].follow, { type: 'follow', tagid: tagid })];
                    case 1:
                        res = _a.sent();
                        antd_1.message.info('关注成功');
                        location.reload();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: index_module_scss_1["default"].tags }, followOrAll === null || followOrAll === void 0 ? void 0 : followOrAll.map(function (tag) {
        var _a;
        return (React.createElement("div", { key: tag === null || tag === void 0 ? void 0 : tag.title, className: index_module_scss_1["default"].tagWrapper },
            React.createElement(func_1.IconFont, { type: tag === null || tag === void 0 ? void 0 : tag.icon }),
            React.createElement("div", { className: index_module_scss_1["default"].title }, tag.title),
            React.createElement("div", null,
                "\u6709 ",
                (tag === null || tag === void 0 ? void 0 : tag.article_count) || 0,
                " \u7BC7\u6587\u7AE0"),
            ((_a = tag === null || tag === void 0 ? void 0 : tag.users) === null || _a === void 0 ? void 0 : _a.find(function (user) { return Number(user === null || user === void 0 ? void 0 : user.id) === Number(userId); })) ? (React.createElement(antd_1.Button, { onClick: function () { return handleUnFollow(tag === null || tag === void 0 ? void 0 : tag.id); } }, "\u5DF2\u5173\u6CE8")) : (React.createElement(antd_1.Button, { type: "primary", color: "primary", onClick: function () { return handleFollow(tag === null || tag === void 0 ? void 0 : tag.id); } }, "+\u5173\u6CE8"))));
    })));
};
var Tag = function () {
    var store = store_1.useStore();
    var _a = react_1.useState([]), items = _a[0], setItems = _a[1];
    // TODO CSR 客户端渲染
    react_1.useEffect(function () {
        http_1["default"].get(api_1["default"].getTag).then(function (res) {
            var _a = res.data, _b = _a.followTags, followTags = _b === void 0 ? [] : _b, _c = _a.allTags, allTags = _c === void 0 ? [] : _c;
            setItems([
                { label: '已关注', followTags: followTags },
                { label: '全部', allTags: allTags },
            ]);
        });
    }, []);
    return (React.createElement("div", null,
        React.createElement(antd_1.Tabs, { defaultActiveKey: "1", items: items.map(function (item, index) {
                return {
                    label: "" + item.label,
                    key: String(index),
                    children: React.createElement(TabContent, { data: item })
                };
            }) })));
};
// http://localhost:3000/tag
exports["default"] = Tag;
