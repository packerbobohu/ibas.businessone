define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "../../borep/DataConverters", "./UserViewApp", "./UserEditApp"], function (require, exports, ibas, bo, BORepositories_1, DataConverters_1, UserViewApp_1, UserEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserListApp extends ibas.BOListApplication {
        constructor() {
            super();
            this.id = UserListApp.APPLICATION_ID;
            this.name = UserListApp.APPLICATION_NAME;
            this.boCode = UserListApp.BUSINESS_OBJECT_CODE;
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
            boRepository.fetchUser({
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
            let app = new UserEditApp_1.UserEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
        viewData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data", ibas.i18n.prop("sys_shell_data_view")));
                return;
            }
            let app = new UserViewApp_1.UserViewApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(data);
        }
        editData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data", ibas.i18n.prop("sys_shell_data_edit")));
                return;
            }
            let app = new UserEditApp_1.UserEditApp();
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
                    if (ibas.objects.instanceOf(item, bo.User)) {
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
                                boRepository.saveUser({
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
            return [
                new ibas.BOListServiceProxy({
                    data: this.view.getSelecteds(),
                    converter: new DataConverters_1.DataConverter4b1(),
                })
            ];
        }
    }
    UserListApp.APPLICATION_ID = "8470e426-fb90-4c4f-a542-ac109826b2fd";
    UserListApp.APPLICATION_NAME = "businessone_app_user_list";
    UserListApp.BUSINESS_OBJECT_CODE = bo.User.BUSINESS_OBJECT_CODE;
    exports.UserListApp = UserListApp;
});
