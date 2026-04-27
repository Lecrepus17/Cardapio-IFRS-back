"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Core = void 0;
var mongoose_1 = require("mongoose");
/**
 * @summary Classe abstrata para criação das models
 * @type titulo {String} título
 * @type texto  {String} texto ou descrição
 * @type imagem {String} imagem default ou avatar
 * @type dataPublicacao {Date} data de publicação
 * @type tags {String} tags relacionada a model
 * @type link {String} link do conteudo Ex.: https://conteudo.com.br
 * @type ativo {Boolean} status
 */
var Core = /** @class */ (function (_super) {
    __extends(Core, _super);
    function Core() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Core;
}(mongoose_1.Document));
exports.Core = Core;
