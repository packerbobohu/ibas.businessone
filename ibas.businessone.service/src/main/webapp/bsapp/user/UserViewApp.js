define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./UserEditApp"], function (require, exports, ibas, bo, BORepositories_1, UserEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = UserViewApp.APPLICATION_ID;
            this.name = UserViewApp.APPLICATION_NAME;
            this.boCode = UserViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new UserEditApp_1.UserEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (arguments[0] instanceof bo.User) {
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
            boRepository.fetchUser({
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
    UserViewApp.APPLICATION_ID = "1cba9493-0307-4564-aeff-e0cbc6eee5cb";
    UserViewApp.APPLICATION_NAME = "businessone_app_user_view";
    UserViewApp.BUSINESS_OBJECT_CODE = bo.User.BUSINESS_OBJECT_CODE;
    exports.UserViewApp = UserViewApp;
    class UserLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = UserViewApp.APPLICATION_ID;
            this.name = UserViewApp.APPLICATION_NAME;
            this.boCode = UserViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new UserViewApp();
        }
    }
    exports.UserLinkServiceMapping = UserLinkServiceMapping;
});
