"use strict";
exports.__esModule = true;
exports.GaleriaRepository = void 0;
var mongoose_1 = require("mongoose");
var GaleriaSchema = new mongoose_1["default"].Schema({
    titulo: { String: String },
    texto: { String: String },
    dataPublicacao: { Date: Date },
    fotos: [Array()],
    ativo: { Boolean: Boolean }
});
exports.GaleriaRepository = mongoose_1["default"].model("galeria", GaleriaSchema);
