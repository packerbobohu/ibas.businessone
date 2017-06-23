define(["require", "exports", "ibas/index"], function (require, exports, ibas) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyViewApp extends ibas.Application {
        constructor() {
            super();
            this.id = CompanyViewApp.APPLICATION_ID;
            this.name = CompanyViewApp.APPLICATION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
        }
        viewShowed() {
        }
        run(...args) {
            if (typeof arguments[0] === "string") {
                this.url = arguments[0];
            }
            super.run();
        }
        get url() {
            return this.view.url;
        }
        set url(value) {
            this.view.url = value;
        }
    }
    CompanyViewApp.APPLICATION_ID = "169e8542-e5d4-4151-a30f-09124ccf7824";
    CompanyViewApp.APPLICATION_NAME = "businessone_app_company_view";
    exports.CompanyViewApp = CompanyViewApp;
});
