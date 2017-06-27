/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { UserCompanyViewApp } from "./UserCompanyViewApp";

/**
 * 用户公司功能
 */
export class UserCompanyFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID_PREFIX = "64d02c6e-e9ae-4556-9d94-";
    /** 构造函数 */
    constructor(company: ibas.KeyText) {
        super();
        this.company = company;
        this.id = UserCompanyFunc.FUNCTION_ID_PREFIX + ibas.strings.fill(company.key, 12, "0");
        this.name = company.key;
        this.description = company.text;
    }
    private company: ibas.KeyText;
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: UserCompanyViewApp = new UserCompanyViewApp();
        app.navigation = this.navigation;
        app.company = this.company.key;
        app.description = this.company.text;
        return app;
    }
}