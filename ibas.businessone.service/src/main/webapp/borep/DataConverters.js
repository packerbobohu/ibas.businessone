define(["require", "exports", "ibas/index"], function (require, exports, ibas) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataConverter4b1 extends ibas.DataConverter4j {
        createConverter() {
            return new BOConverter4b1;
        }
    }
    exports.DataConverter4b1 = DataConverter4b1;
    class BOConverter4b1 extends ibas.BOConverter {
        customParsing(data) {
            return data;
        }
        convertData(boName, property, value) {
            return super.convertData(boName, property, value);
        }
        parsingData(boName, property, value) {
            return super.parsingData(boName, property, value);
        }
    }
});
