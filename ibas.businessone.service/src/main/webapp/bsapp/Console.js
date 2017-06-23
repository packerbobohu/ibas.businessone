define(["require", "exports", "ibas/index", "./company/index", "./user/index", "./users/index", "../borep/BORepositories"], function (require, exports, ibas, index_1, index_2, index_3, BORepositories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Console extends ibas.ModuleConsole {
        constructor() {
            super();
            this.id = Console.CONSOLE_ID;
            this.name = Console.CONSOLE_NAME;
        }
        navigation() {
            return this._navigation;
        }
        registers() {
            this.register(new index_1.CompanyFunc());
            this.register(new index_2.UserFunc());
            this.register(new index_1.CompanyChooseServiceMapping());
            this.register(new index_1.CompanyLinkServiceMapping());
            this.register(new index_2.UserChooseServiceMapping());
            this.register(new index_2.UserLinkServiceMapping());
        }
        run() {
            ibas.i18n.load(this.rootUrl + "resources/languages/businessone.json");
            ibas.i18n.load(this.rootUrl + "resources/languages/bo/company.json");
            ibas.i18n.load(this.rootUrl + "resources/languages/bo/user.json");
            this.description = ibas.i18n.prop(this.name.toLowerCase());
            this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
            let uiModules = [];
            if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
                && this.plantform === ibas.emPlantform.PHONE) {
                uiModules.push("../bsui/m/Navigation");
            }
            else {
                uiModules.push("../bsui/c/Navigation");
            }
            let that = this;
            require(uiModules, function (ui) {
                that._navigation = new ui.default();
                that.initialize();
            });
            super.run();
        }
    }
    Console.CONSOLE_ID = "d89c3bd0-8dab-4f62-8439-0b8a39c66bf2";
    Console.CONSOLE_NAME = "BusinessOne";
    exports.Console = Console;
    class ConsoleUsers extends ibas.ModuleConsole {
        constructor() {
            super();
            this.id = ConsoleUsers.CONSOLE_ID;
            this.name = ConsoleUsers.CONSOLE_NAME;
        }
        navigation() {
            return this._navigation;
        }
        registers() {
        }
        run() {
            ibas.i18n.load(this.rootUrl + "resources/languages/businessone.json");
            ibas.i18n.load(this.rootUrl + "resources/languages/bo/company.json");
            ibas.i18n.load(this.rootUrl + "resources/languages/bo/user.json");
            this.description = ibas.i18n.prop(this.name.toLowerCase());
            this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
            let uiModules = [];
            if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
                && this.plantform === ibas.emPlantform.PHONE) {
                uiModules.push("../bsui/m/Navigation");
            }
            else {
                uiModules.push("../bsui/c/Navigation");
            }
            let that = this;
            require(uiModules, function (ui) {
                that._navigation = new ui.default();
                let boRepository = new BORepositories_1.BORepositoryBusinessOne();
                boRepository.fetchUserCompanies({
                    user: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE),
                    onCompleted(opRslt) {
                        if (opRslt.resultCode !== 0) {
                            ibas.logger.log(ibas.emMessageLevel.ERROR, opRslt.message);
                        }
                        for (let item of opRslt.resultObjects) {
                            that.register(new index_3.UserCompanyFunc(item));
                        }
                        that.fireInitialized();
                    }
                });
            });
            super.run();
        }
    }
    ConsoleUsers.CONSOLE_ID = "4d8b5b7d-b1ae-418b-abc8-67d70ae8c36e";
    ConsoleUsers.CONSOLE_NAME = "BusinessOneUsers";
    exports.ConsoleUsers = ConsoleUsers;
});
