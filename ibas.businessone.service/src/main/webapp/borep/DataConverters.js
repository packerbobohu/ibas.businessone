define(["require", "exports", "ibas/index", "./bo/index", "../api/index"], function (require, exports, ibas, bo, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataConverter4b1 extends ibas.DataConverter4j {
        createConverter() {
            return new BOConverter4b1;
        }
        convert(data, sign) {
            return super.convert(data, sign);
        }
        parsing(data, sign) {
            return super.parsing(data, sign);
        }
    }
    exports.DataConverter4b1 = DataConverter4b1;
    class BOConverter4b1 extends ibas.BOConverter {
        customParsing(data) {
            return data;
        }
        convertData(boName, property, value) {
            if (boName === bo.Company.name) {
                if (property === bo.Company.PROPERTY_RUNTYPE_NAME) {
                    return ibas.enums.toString(index_1.emRunType, value);
                }
            }
            return super.convertData(boName, property, value);
        }
        parsingData(boName, property, value) {
            if (boName === bo.Company.name) {
                if (property === bo.Company.PROPERTY_RUNTYPE_NAME) {
                    return ibas.enums.valueOf(index_1.emRunType, value);
                }
            }
            return super.parsingData(boName, property, value);
        }
    }
});
