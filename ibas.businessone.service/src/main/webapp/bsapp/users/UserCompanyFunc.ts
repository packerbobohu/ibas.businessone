/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { CompanyViewApp } from "../company/index";

/**
 * 用户公司功能
 */
export class UserCompanyFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID_PREFIX = "64d02c6e-e9ae-4556-9d94-";
    /** 构造函数 */
    constructor(company: bo.UserCompany) {
        super();
        this.company = company;
        this.id = UserCompanyFunc.FUNCTION_ID_PREFIX + ibas.strings.fill(company.company, 12, "0");
        this.name = company.company;
        this.description = company.company;
    }
    private company: bo.UserCompany;
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: CompanyViewApp = new CompanyViewApp();
        app.navigation = this.navigation;
        app.url = this.company.url;
        return app;
    }
}