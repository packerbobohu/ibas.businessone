define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories"], function (require, exports, ibas, bo, BORepositories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyEditApp extends ibas.BOEditApplication {
        constructor() {
            super();
            this.id = CompanyEditApp.APPLICATION_ID;
            this.name = CompanyEditApp.APPLICATION_NAME;
            this.boCode = CompanyEditApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.deleteDataEvent = this.deleteData;
            this.view.createDataEvent = this.createData;
        }
        viewShowed() {
            if (ibas.objects.isNull(this.editData)) {
                this.editData = new bo.Company();
                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
            }
            this.view.showCompany(this.editData);
        }
        run(...args) {
            let that = this;
            if (ibas.objects.instanceOf(arguments[0], bo.Company)) {
                let criteria = arguments[0].criteria();
                if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                    let boRepository = new BORepositories_1.BORepositoryBusinessOne();
                    boRepository.fetchCompany({
                        criteria: criteria,
                        onCompleted(opRslt) {
                            let data;
                            if (opRslt.resultCode === 0) {
                                data = opRslt.resultObjects.firstOrDefault();
                            }
                            if (ibas.objects.instanceOf(data, bo.Company)) {
                                that.editData = data;
                                that.show();
                            }
                            else {
                                that.messages({
                                    type: ibas.emMessageType.WARNING,
                                    message: ibas.i18n.prop("sys_shell_data_deleted_and_created"),
                                    onCompleted() {
                                        that.show();
                                    }
                                });
                            }
                        }
                    });
                    return;
                }
            }
            super.run();
        }
        saveData() {
            let that = this;
            let boRepository = new BORepositories_1.BORepositoryBusinessOne();
            boRepository.saveCompany({
                beSaved: this.editData,
                onCompleted(opRslt) {
                    try {
                        that.busy(false);
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        if (opRslt.resultObjects.length === 0) {
                            that.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_data_delete") + ibas.i18n.prop("sys_shell_sucessful"));
                            that.editData = undefined;
                        }
                        else {
                            that.editData = opRslt.resultObjects.firstOrDefault();
                            that.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_data_save") + ibas.i18n.prop("sys_shell_sucessful"));
                        }
                        that.viewShowed();
                    }
                    catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.busy(true);
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
        }
        deleteData() {
            let that = this;
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("sys_whether_to_delete"),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action) {
                    if (action === ibas.emMessageAction.YES) {
                        that.editData.delete();
                        that.saveData();
                    }
                }
            });
        }
        createData(clone) {
            let that = this;
            let createData = function () {
                if (clone) {
                    that.editData = that.editData.clone();
                    that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_cloned_new"));
                    that.viewShowed();
                }
                else {
                    that.editData = new bo.Company();
                    that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
                    that.viewShowed();
                }
            };
            if (that.editData.isDirty) {
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("sys_data_not_saved_whether_to_continue"),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action) {
                        if (action === ibas.emMessageAction.YES) {
                            createData();
                        }
                    }
                });
            }
            else {
                createData();
            }
        }
    }
    CompanyEditApp.APPLICATION_ID = "06a36480-7f62-4d24-a30e-c20f0654e8d1";
    CompanyEditApp.APPLICATION_NAME = "businessone_app_company_edit";
    CompanyEditApp.BUSINESS_OBJECT_CODE = bo.Company.BUSINESS_OBJECT_CODE;
    exports.CompanyEditApp = CompanyEditApp;
});
