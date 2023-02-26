"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.__esModule = true;
var api_1 = require("@/utils/api");
var http_1 = require("@/utils/http");
var react_1 = require("@nextui-org/react");
var antd_1 = require("antd");
var mobx_react_lite_1 = require("mobx-react-lite");
var router_1 = require("next/router");
var TextArea = antd_1.Input.TextArea;
var layout = {
    labelCol: { span: 3 }
};
var tailLayout = {
//   wrapperCol: { offset: 4 },
};
var Profile = function () {
    // TODO 使用antd表单组件
    var form = antd_1.Form.useForm()[0];
    var back = router_1.useRouter().back;
    var handleSubmit = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, http_1["default"].post(api_1["default"].userUpdate, __assign({}, values))];
                case 1:
                    res = _a.sent();
                    antd_1.message.info(res.msg);
                    back();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(react_1.Row, { justify: "center" },
        React.createElement(antd_1.Form, __assign({ style: { width: '700px' } }, layout, { form: form, onFinish: handleSubmit }),
            React.createElement(antd_1.Form.Item, { label: "\u7528\u6237\u540D", name: "avatar" },
                React.createElement(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u5934\u50CF\u7684\u5730\u5740" })),
            React.createElement(antd_1.Form.Item, { label: "\u7528\u6237\u540D", name: "nickname" },
                React.createElement(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D" })),
            React.createElement(antd_1.Form.Item, { label: "\u804C\u4F4D", name: "job" },
                React.createElement(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u804C\u4F4D" })),
            React.createElement(antd_1.Form.Item, { label: "\u4E2A\u4EBA\u4ECB\u7ECD", name: "introduce" },
                React.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u4E2A\u4EBA\u4ECB\u7ECD" })),
            React.createElement(antd_1.Form.Item, __assign({}, tailLayout),
                React.createElement(react_1.Row, { justify: 'space-around' },
                    React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "\u4FDD\u5B58\u4FEE\u6539"),
                    React.createElement(antd_1.Button, null, "\u53D6\u6D88"))))));
};
// 这样导出才会默认指向 /
exports["default"] = mobx_react_lite_1.observer(Profile);
