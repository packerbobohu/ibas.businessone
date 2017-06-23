/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryBusinessOne } from "../../borep/BORepositories";
import { CompanyEditApp } from "./CompanyEditApp";

/** 查看应用-公司 */
export class CompanyViewApp extends ibas.Application<ICompanyViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "169e8542-e5d4-4151-a30f-09124ccf7824";
    /** 应用名称 */
    static APPLICATION_NAME: string = "businessone_app_company_view";
    /** 构造函数 */
    constructor() {
        super();
        this.id = CompanyViewApp.APPLICATION_ID;
        this.name = CompanyViewApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        if (typeof arguments[0] === "string") {
            this.url = arguments[0];
        }
        super.run();
    }
    /** 地址 */
    get url(): string {
        return this.view.url;
    }
    set url(value) {
        this.view.url = value;
    }
}
/** 视图-公司 */
export interface ICompanyViewView extends ibas.IUrlView {

}
