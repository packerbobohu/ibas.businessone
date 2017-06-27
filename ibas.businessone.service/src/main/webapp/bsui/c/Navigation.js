define(["require", "exports", "ibas/index", "../../bsapp/company/index", "../../bsapp/user/index", "../../bsapp/users/index", "./company/index", "./user/index", "./users/index"], function (require, exports, ibas, companyApps, userApps, usersApps, companyViews, userViews, usersViews) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Navigation extends ibas.ViewNavigation {
        newView(id) {
            let view = null;
            switch (id) {
                case companyApps.CompanyListApp.APPLICATION_ID:
                    view = new companyViews.CompanyListView();
                    break;
                case companyApps.CompanyChooseApp.APPLICATION_ID:
                    view = new companyViews.CompanyChooseView();
                    break;
                case companyApps.CompanyViewApp.APPLICATION_ID:
                    view = new companyViews.CompanyViewView();
                    break;
                case companyApps.CompanyEditApp.APPLICATION_ID:
                    view = new companyViews.CompanyEditView();
                    break;
                case userApps.UserListApp.APPLICATION_ID:
                    view = new userViews.UserListView();
                    break;
                case userApps.UserChooseApp.APPLICATION_ID:
                    view = new userViews.UserChooseView();
                    break;
                case userApps.UserViewApp.APPLICATION_ID:
                    view = new userViews.UserViewView();
                    break;
                case userApps.UserEditApp.APPLICATION_ID:
                    view = new userViews.UserEditView();
                    break;
                case usersApps.UserCompanyViewApp.APPLICATION_ID:
                    view = new usersViews.UserCompanyViewView();
                    break;
                default:
                    break;
            }
            return view;
        }
    }
    exports.default = Navigation;
});
