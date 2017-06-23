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
            return app;
        }
    }
    UserCompanyFunc.FUNCTION_ID_PREFIX = "3563a3f7-4062-4aab-b456-";
    exports.UserCompanyFunc = UserCompanyFunc;
});
