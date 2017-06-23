define(["require", "exports", "ibas/index", "./bo/index"], function (require, exports, ibas, bo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataConverter4b1 extends ibas.DataConverter4j {
        createConverter() {
            return new BOConverter4b1;
        }
        convert(data, sign) {
            if (ibas.objects.instanceOf(data, bo.UserCompany)) {
                let newData = data;
                let remote = {
                    type: data.constructor.name,
                    User: newData.user,
                    Company: newData.company,
                    Url: newData.url,
                };
                return remote;
            }
            else {
                return super.convert(data, sign);
            }
        }
        parsing(data, sign) {
            if (data.type === bo.UserCompany.name) {
                let remote = data;
                let newData = new bo.UserCompany();
                newData.user = remote.User;
                newData.company = remote.Company;
                newData.url = remote.Url;
                return newData;
            }
            else {
                return super.parsing(data, sign);
            }
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
