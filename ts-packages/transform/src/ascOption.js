"use strict";
exports.__esModule = true;
exports.APIOptionImpl = void 0;
var preprocess_1 = require("./preprocess");
var path = require("path");
var fs = require("fs");

function modifySource(sourceText, point) {
    if (point.mode == preprocess_1.ModifyType.REPLACE) {
        var prefix = sourceText.substring(0, point.range.start);
        var suffix = sourceText.substring(point.range.end, sourceText.length);
        return prefix + point.code + suffix;
    } else if (point.mode == preprocess_1.ModifyType.APPEND) {
        return sourceText + point.code;
    } else if (point.mode == preprocess_1.ModifyType.TOP) {
        return point.code + sourceText;
    }
    return sourceText;
};

var APIOptionImpl = /** @class */ (function () {
    function APIOptionImpl() {
    }
    APIOptionImpl.prototype.readFile = function (filename, baseDir) {
        var name = path.resolve(baseDir, filename);
        try {
            var text_1 = fs.readFileSync(name, "utf8");
            var sourceModifier = process.sourceModifier ? process.sourceModifier : new preprocess_1.SourceModifier();
            if (sourceModifier.fileExtMap.has(filename)) {
                var extCodes = sourceModifier.fileExtMap.get(filename);
                extCodes.sort((a, b) => {
                    if (a.mode != b.mode) return a.mode - b.mode;
                    return (b.range.end - a.range.end); 
                }).forEach(function (item) {
                    text_1 = modifySource(text_1, item);
                });
            }
            return text_1;
        }
        catch (e) {
            return null;
        }
    };
    return APIOptionImpl;
}());
exports.APIOptionImpl = APIOptionImpl;