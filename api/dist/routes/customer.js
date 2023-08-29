"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send(200);
});
router.post("/", (req, res) => {
    res.send(200);
});
exports.CustomerRouter = router;
