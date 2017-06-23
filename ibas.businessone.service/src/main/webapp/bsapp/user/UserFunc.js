define(["require", "exports", "ibas/index", "./UserListApp"], function (require, exports, ibas, UserListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = UserFunc.FUNCTION_ID;
            this.name = UserFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new UserListApp_1.UserListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    UserFunc.FUNCTION_ID = "dad0104b-7167-4929-875b-68db905ed54d";
    UserFunc.FUNCTION_NAME = "businessone_func_user";
    exports.UserFunc = UserFunc;
});
