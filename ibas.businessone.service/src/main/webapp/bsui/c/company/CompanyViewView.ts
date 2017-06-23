/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";
import { ICompanyViewView } from "../../../bsapp/company/index";

/**
 * 查看视图-公司
 */
export class CompanyViewView extends ibas.UrlView implements ICompanyViewView {

    constructor() {
        super();
        this.isInside = true;
    }
    /** 绘制视图 */
    darw(): any {
        return undefined;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;

    /** 显示数据 */
    showCompany(data: bo.Company): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
    }
}
