define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "../../3rdparty/initialfantasy/index"], function (require, exports, ibas, bo, BORepositories_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserEditApp extends ibas.BOEditApplication {
        constructor() {
            super();
            this.id = UserEditApp.APPLICATION_ID;
            this.name = UserEditApp.APPLICATION_NAME;
            this.boCode = UserEditApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.deleteDataEvent = this.deleteData;
            this.view.createDataEvent = this.createData;
            this.view.chooseCompanyEvent = this.chooseCompany;
            this.view.chooseUserEvent = this.chooseUser;
        }
        viewShowed() {
            if (ibas.objects.isNull(this.editData)) {
                this.editData = new bo.User();
                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
            }
            this.view.showUser(this.editData);
        }
        run(...args) {
            let that = this;
            if (ibas.objects.instanceOf(arguments[0], bo.User)) {
                let criteria = arguments[0].criteria();
                if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                    let boRepository = new BORepositories_1.BORepositoryBusinessOne();
                    boRepository.fetchUser({
                        criteria: criteria,
                        onCompleted(opRslt) {
                            let data;
                            if (opRslt.resultCode === 0) {
                                data = opRslt.resultObjects.firstOrDefault();
                            }
                            if (ibas.objects.instanceOf(data, bo.User)) {
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
            boRepository.saveUser({
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
                    that.editData = new bo.User();
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
        chooseUser() {
            let that = this;
            ibas.servicesManager.runChooseService({
                boCode: index_1.BO_CODE_USER,
                criteria: [],
                onCompleted(selecteds) {
                    that.editData.user = selecteds.firstOrDefault().code;
                }
            });
        }
        chooseCompany() {
            let that = this;
            ibas.servicesManager.runChooseService({
                boCode: bo.Company.BUSINESS_OBJECT_CODE,
                criteria: [],
                onCompleted(selecteds) {
                    that.editData.company = selecteds.firstOrDefault().name;
                }
            });
        }
    }
    UserEditApp.APPLICATION_ID = "62608aeb-d340-43f6-8f9c-5cff11f7f44b";
    UserEditApp.APPLICATION_NAME = "businessone_app_user_edit";
    UserEditApp.BUSINESS_OBJECT_CODE = bo.User.BUSINESS_OBJECT_CODE;
    exports.UserEditApp = UserEditApp;
});
