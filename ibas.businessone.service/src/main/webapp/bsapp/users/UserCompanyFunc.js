define(["require", "exports", "ibas/index", "../company/index"], function (require, exports, ibas, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserCompanyFunc extends ibas.ModuleFunction {
        constructor(company) {
            super();
            this.company = company;
            this.id = UserCompanyFunc.FUNCTION_ID_PREFIX + ibas.strings.fill(company.company, 12, "0");
            this.name = company.company;
            this.description = company.company;
        }
        default() {
            let app = new index_1.CompanyViewApp();
            app.navigation = this.navigation;
            app.url = this.company.url;
            return app;
        }
    }
    UserCompanyFunc.FUNCTION_ID_PREFIX = "64d02c6e-e9ae-4556-9d94-";
    exports.UserCompanyFunc = UserCompanyFunc;
});
