define(["require", "exports", "ibas/index", "./CompanyListApp"], function (require, exports, ibas, CompanyListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = CompanyFunc.FUNCTION_ID;
            this.name = CompanyFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new CompanyListApp_1.CompanyListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    CompanyFunc.FUNCTION_ID = "0f0384cd-4cde-4be9-be8c-a9f2e3360300";
    CompanyFunc.FUNCTION_NAME = "businessone_func_company";
    exports.CompanyFunc = CompanyFunc;
});
