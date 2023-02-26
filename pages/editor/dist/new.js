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
exports.getServerSideProps = void 0;
var api_1 = require("@/utils/api");
var func_1 = require("@/utils/func");
var http_1 = require("@/utils/http");
var prisma_1 = require("@/utils/prisma");
var react_1 = require("@nextui-org/react");
require("@uiw/react-markdown-preview/markdown.css");
require("@uiw/react-md-editor/markdown-editor.css");
var antd_1 = require("antd");
var dynamic_1 = require("next/dynamic");
var router_1 = require("next/router");
var react_2 = require("react");
var prisma = new prisma_1["default"]();
/**
 * SSR 渲染 控制台输出
 * @param params
 * @returns
 */
function getServerSideProps() {
    return __awaiter(this, void 0, void 0, function () {
        var tags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.tag.findMany()
                    //   返回个 props 在下面可以用
                ];
                case 1:
                    tags = _a.sent();
                    //   返回个 props 在下面可以用
                    return [2 /*return*/, {
                            props: {
                                tags: tags
                            }
                        }];
            }
        });
    });
}
exports.getServerSideProps = getServerSideProps;
var MDEditor = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('@uiw/react-md-editor'); }); }, { ssr: false });
var NewEditor = function (_a) {
    var tags = _a.tags;
    var push = router_1.useRouter().push;
    // 文章内容
    var _b = react_2.useState('**Hello world!!!**'), value = _b[0], setValue = _b[1];
    // 标题
    var _c = react_2.useState(''), title = _c[0], setTitle = _c[1];
    // 标签
    var _d = react_2.useState(tags || []), allTags = _d[0], setAllTags = _d[1];
    var _e = react_2.useState([]), tagIds = _e[0], setTagIds = _e[1];
    // 发布
    var handlePublish = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!title) {
                        alert('标题为空');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, http_1["default"].post(api_1["default"].publish, { title: title, content: value, tagIds: tagIds })];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    push('/');
                    return [2 /*return*/];
            }
        });
    }); };
    // 标签
    var handleTagChange = function (value) {
        setTagIds(value);
    };
    return (React.createElement("div", null,
        React.createElement(react_1.Input, { fullWidth: true, clearable: true, contentRightStyling: false, label: "\u6587\u7AE0\u6807\u9898", placeholder: "Type your title...", onChange: function (e) { return setTitle(e.target.value); }, onContentClick: handlePublish, contentRight: React.createElement(func_1.IconFont, { type: 'icon-fabu1' }) }),
        React.createElement(antd_1.Select, { style: { width: '100%', padding: '10px 0' }, onChange: handleTagChange, mode: "tags", allowClear: true, placeholder: "\u8BF7\u9009\u62E9\u6807\u7B7E" }, allTags.map(function (item) { return (React.createElement(antd_1.Select.Option, { key: item.id, value: item.id }, item.title)); })),
        React.createElement(MDEditor, { height: 600, value: value, onChange: setValue })));
};
// TODO NewEditor.layout
// 配置为 null 不显示header footer 在_app里判断
// NewEditor.layout = null
exports["default"] = NewEditor;
