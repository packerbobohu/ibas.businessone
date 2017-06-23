/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as companyApps from "../../bsapp/company/index";
import * as userApps from "../../bsapp/user/index";
import * as companyViews from "./company/index";
import * as userViews from "./user/index";

/**
 * 视图导航
 */
export default class Navigation extends ibas.ViewNavigation {

    /**
     * 创建实例
     * @param id 应用id
     */
    protected newView(id: string): ibas.IView {
        let view: ibas.IView = null;
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
            default:
                break;
        }
        return view;
    }
}
