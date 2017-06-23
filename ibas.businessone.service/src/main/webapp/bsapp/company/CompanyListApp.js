define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./CompanyViewApp", "./CompanyEditApp"], function (require, exports, ibas, bo, BORepositories_1, CompanyViewApp_1, CompanyEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyListApp extends ibas.BOListApplication {
        constructor() {
            super();
            this.id = CompanyListApp.APPLICATION_ID;
            this.name = CompanyListApp.APPLICATION_NAME;
            this.boCode = CompanyListApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
            this.view.deleteDataEvent = this.deleteData;
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
                        that.view.showData(opRslt.resultObjects);
                        that.busy(false);
                    }
                    catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
        }
        newData() {
            let app = new CompanyEditApp_1.CompanyEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
        viewData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data", ibas.i18n.prop("sys_shell_data_view")));
                return;
            }
            let app = new CompanyViewApp_1.CompanyViewApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(data);
        }
        editData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data", ibas.i18n.prop("sys_shell_data_edit")));
                return;
            }
            let app = new CompanyEditApp_1.CompanyEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(data);
        }
        deleteData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data", ibas.i18n.prop("sys_shell_data_delete")));
                return;
            }
            let beDeleteds = new ibas.ArrayList();
            if (data instanceof Array) {
                for (let item of data) {
                    if (ibas.objects.instanceOf(item, bo.Company)) {
                        item.delete();
                        beDeleteds.add(item);
                    }
                }
            }
            if (beDeleteds.length === 0) {
                return;
            }
            let that = this;
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("sys_shell_whether_to_delete", beDeleteds.length),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action) {
                    if (action === ibas.emMessageAction.YES) {
                        try {
                            let boRepository = new BORepositories_1.BORepositoryBusinessOne();
                            let saveMethod = function (beSaved) {
                                boRepository.saveCompany({
                                    beSaved: beSaved,
                                    onCompleted(opRslt) {
                                        try {
                                            if (opRslt.resultCode !== 0) {
                                                throw new Error(opRslt.message);
                                            }
                                            let index = beDeleteds.indexOf(beSaved) + 1;
                                            if (index > 0 && index < beDeleteds.length) {
                                                saveMethod(beDeleteds[index]);
                                            }
                                            else {
                                                that.busy(false);
                                                that.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_data_delete") + ibas.i18n.prop("sys_shell_sucessful"));
                                            }
                                        }
                                        catch (error) {
                                            that.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("sys_shell_data_delete_error", beSaved, error.message));
                                        }
                                    }
                                });
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_data_deleting", beSaved));
                            };
                            that.busy(true);
                            saveMethod(beDeleteds.firstOrDefault());
                        }
                        catch (error) {
                            that.busy(false);
                            that.messages(error);
                        }
                    }
                }
            });
        }
        getServiceProxies() {
            return [];
        }
    }
    CompanyListApp.APPLICATION_ID = "7d461fcc-b0ca-4e29-8c31-0900fe9609a9";
    CompanyListApp.APPLICATION_NAME = "businessone_app_company_list";
    CompanyListApp.BUSINESS_OBJECT_CODE = bo.Company.BUSINESS_OBJECT_CODE;
    exports.CompanyListApp = CompanyListApp;
});
