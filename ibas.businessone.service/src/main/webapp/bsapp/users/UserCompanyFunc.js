define(["require", "exports", "ibas/index", "./UserCompanyViewApp"], function (require, exports, ibas, UserCompanyViewApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserCompanyFunc extends ibas.ModuleFunction {
        constructor(company) {
            super();
            this.company = company;
            this.id = UserCompanyFunc.FUNCTION_ID_PREFIX + ibas.strings.fill(company.key, 12, "0");
            this.name = company.key;
            this.description = company.text;
        }
        default() {
            let app = new UserCompanyViewApp_1.UserCompanyViewApp();
            app.navigation = this.navigation;
            app.company = this.company.key;
            app.description = this.company.text;
            return app;
        }
    }
    UserCompanyFunc.FUNCTION_ID_PREFIX = "64d02c6e-e9ae-4556-9d94-";
    exports.UserCompanyFunc = UserCompanyFunc;
});
