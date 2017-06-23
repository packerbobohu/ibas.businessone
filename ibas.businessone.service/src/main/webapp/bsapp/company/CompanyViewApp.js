define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./CompanyEditApp"], function (require, exports, ibas, bo, BORepositories_1, CompanyEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = CompanyViewApp.APPLICATION_ID;
            this.name = CompanyViewApp.APPLICATION_NAME;
            this.boCode = CompanyViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new CompanyEditApp_1.CompanyEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (arguments[0] instanceof bo.Company) {
                this.viewData = arguments[0];
                this.show();
            }
            else {
                super.run();
            }
        }
        fetchData(criteria) {
            this.busy(true);
            let that = this;
            if (typeof criteria === "string") {
                criteria = new ibas.Criteria();
            }
            let boRepository = new BORepositories_1.BORepositoryBusinessOne();
            boRepository.fetchCompany({
                criteria: criteria,
                onCompleted(opRslt) {
                    try {
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        that.viewData = opRslt.resultObjects.firstOrDefault();
                        that.viewShowed();
                    }
                    catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
        }
        getServiceProxies() {
            return [];
        }
    }
    CompanyViewApp.APPLICATION_ID = "169e8542-e5d4-4151-a30f-09124ccf7824";
    CompanyViewApp.APPLICATION_NAME = "businessone_app_company_view";
    CompanyViewApp.BUSINESS_OBJECT_CODE = bo.Company.BUSINESS_OBJECT_CODE;
    exports.CompanyViewApp = CompanyViewApp;
    class CompanyLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = CompanyViewApp.APPLICATION_ID;
            this.name = CompanyViewApp.APPLICATION_NAME;
            this.boCode = CompanyViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new CompanyViewApp();
        }
    }
    exports.CompanyLinkServiceMapping = CompanyLinkServiceMapping;
});
