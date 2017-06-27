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

export const PARAMETER_NAME_COMPANY_URL: string = "${Url}";
export const CONFIG_ITEM_B1_OPEN_INSIDE: string = "b1OpenInside";
/** 应用-查看用户公司 */
export class UserCompanyViewApp extends ibas.Application<IUserCompanyViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "fe28b42e-c577-4ada-bb7d-b9f87d8c5380";
    /** 应用名称 */
    static APPLICATION_NAME: string = "businessone_app_user_company_view";
    /** 构造函数 */
    constructor() {
        super();
        this.id = UserCompanyViewApp.APPLICATION_ID;
        this.name = UserCompanyViewApp.APPLICATION_NAME;
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
        if (ibas.objects.isNull(this.company)) {
            this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("businessoneusers_not_provided_company"));
        } else {
            let that: this = this;
            let boRepository: BORepositoryBusinessOne = new BORepositoryBusinessOne();
            boRepository.runUserCompany({
                key: this.company,
                onCompleted(opRslt: ibas.IOperationResult<ibas.KeyText>): void {
                    try {
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        let address: ibas.KeyText = opRslt.resultObjects.firstOrDefault((item: ibas.KeyText) => {
                            return item.key === PARAMETER_NAME_COMPANY_ADDRESS;
                        });
                        if (ibas.objects.isNull(address)) {
                            throw new Error(ibas.i18n.prop("businessoneusers_company_invalid", that.company));
                        }
                        that.view.url = address.text;
                        that.view.isInside = ibas.config.get(CONFIG_ITEM_B1_OPEN_INSIDE, true);
                        that.show();
                    } catch (error) {
                        that.messages(error);
                    }
                }
            });
        }
    }
    /** 公司 */
    company: string;
}
/** 视图-公司 */
export interface IUserCompanyViewView extends ibas.IUrlView {

}
