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
import { UserEditApp } from "./UserEditApp";

/** 选择应用-用户 */
export class UserChooseApp extends ibas.BOChooseService<IUserChooseView, bo.User> {

    /** 应用标识 */
    static APPLICATION_ID: string = "f32e9131-908d-4fb3-8e48-ab9d60089559";
    /** 应用名称 */
    static APPLICATION_NAME: string = "businessone_app_user_choose";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.User.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = UserChooseApp.APPLICATION_ID;
        this.name = UserChooseApp.APPLICATION_NAME;
        this.boCode = UserChooseApp.BUSINESS_OBJECT_CODE;
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
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryBusinessOne = new BORepositoryBusinessOne();
        boRepository.fetchUser({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 1
                        && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true)) {
                        // 仅一条数据，直接选择
                        that.chooseData(opRslt.resultObjects);
                    } else {
                        if (!that.isViewShowed()) {
                            // 没显示视图，先显示
                            that.show();
                        }
                        that.view.showData(opRslt.resultObjects);
                        that.busy(false);
                    }
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    /** 新建数据 */
    protected newData(): void {
        // 关闭自身
        this.destroy();
        // 调用编辑应用
        let app: UserEditApp = new UserEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
}
/** 视图-用户 */
export interface IUserChooseView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: bo.User[]): void;
}
/** 用户选择服务映射 */
export class UserChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = UserChooseApp.APPLICATION_ID;
        this.name = UserChooseApp.APPLICATION_NAME;
        this.boCode = UserChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new UserChooseApp();
    }
}
