define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./CompanyEditApp"], function (require, exports, ibas, bo, BORepositories_1, CompanyEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = CompanyChooseApp.APPLICATION_ID;
            this.name = CompanyChooseApp.APPLICATION_NAME;
            this.boCode = CompanyChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
        }
        viewShowed() {
        }
        fetchData(criteria) {
            this.busy(true);
            let that = this;
            let boRepository = new BORepositories_1.BORepositoryBusinessOne();
            boRepository.fetchCompany({
                criteria: criteria,
                onCompleted(opRslt) {
                    try {
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        if (opRslt.resultObjects.length === 1
                            && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true)) {
                            that.chooseData(opRslt.resultObjects);
                        }
                        else {
                            if (!that.isViewShowed()) {
                                that.show();
                            }
                            that.view.showData(opRslt.resultObjects);
                            that.busy(false);
                        }
                    }
                    catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
        }
        newData() {
            this.destroy();
            let app = new CompanyEditApp_1.CompanyEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    CompanyChooseApp.APPLICATION_ID = "06ebbe72-ad5d-4492-b1d0-9445aceee430";
    CompanyChooseApp.APPLICATION_NAME = "businessone_app_company_choose";
    CompanyChooseApp.BUSINESS_OBJECT_CODE = bo.Company.BUSINESS_OBJECT_CODE;
    exports.CompanyChooseApp = CompanyChooseApp;
    class CompanyChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = CompanyChooseApp.APPLICATION_ID;
            this.name = CompanyChooseApp.APPLICATION_NAME;
            this.boCode = CompanyChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new CompanyChooseApp();
        }
    }
    exports.CompanyChooseServiceMapping = CompanyChooseServiceMapping;
});
