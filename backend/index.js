"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3100;
var compiler = NodeCompiler.create();
console.log(await compiler.svg({
    mainFileContent: "Hello, typst!",
}));
app.get("/", function (_, res) {
    res.send("Hello from Express with Bun!");
});
app.get("/compile", function (req, res) {
    res.send("Hello from Express with Bun!");
});
app.listen(port, function () {
    console.log("Express app listening at http://localhost:".concat(port));
});
