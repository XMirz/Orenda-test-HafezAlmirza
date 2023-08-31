"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffset = void 0;
const getOffset = (page, take) => {
    if (!page || page < 1)
        page = 1;
    const offset = (page - 1) * take;
    return offset;
};
exports.getOffset = getOffset;
