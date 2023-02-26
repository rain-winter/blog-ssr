"use strict";
exports.__esModule = true;
var react_1 = require("@nextui-org/react");
var mobx_react_lite_1 = require("mobx-react-lite");
var Comment = function () {
    return React.createElement(react_1.Row, { justify: "center" }, "\u8BC4\u8BBA");
};
// 这样导出才会默认指向 /
exports["default"] = mobx_react_lite_1.observer(Comment);
