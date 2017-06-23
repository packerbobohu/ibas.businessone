/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { CompanyListApp } from "./CompanyListApp";

export class CompanyFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "0f0384cd-4cde-4be9-be8c-a9f2e3360300";
    /** 功能名称 */
    static FUNCTION_NAME = "businessone_func_company";
    /** 构造函数 */
    constructor() {
        super();
        this.id = CompanyFunc.FUNCTION_ID;
        this.name = CompanyFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: CompanyListApp = new CompanyListApp();
        app.navigation = this.navigation;
        return app;
    }
}
