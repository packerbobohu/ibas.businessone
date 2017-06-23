/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { CompanyFunc, CompanyChooseServiceMapping } from "./company/index";
import { UserFunc, UserChooseServiceMapping, UserLinkServiceMapping } from "./user/index";
import { UserCompanyFunc } from "./users/index";
import * as bo from "../borep/bo/index";
import { BORepositoryBusinessOne } from "../borep/BORepositories";

/** 模块控制台 */
export class Console extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "d89c3bd0-8dab-4f62-8439-0b8a39c66bf2";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "BusinessOne";
    /** 构造函数 */
    constructor() {
        super();
        this.id = Console.CONSOLE_ID;
        this.name = Console.CONSOLE_NAME;
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 注册功能
        this.register(new CompanyFunc());
        this.register(new UserFunc());
        // 注册服务应用
        this.register(new CompanyChooseServiceMapping());
        this.register(new UserChooseServiceMapping());
        // 注册常驻应用

    }
    /** 运行 */
    run(): void {
        // 加载语言-框架默认
        ibas.i18n.load(this.rootUrl + "resources/languages/businessone.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/company.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/user.json");
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that: Console = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            // 调用初始化
            that.initialize();
        });
        // 保留基类方法
        super.run();
    }
}
/** 模块控制台 */
export class ConsoleUsers extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "4d8b5b7d-b1ae-418b-abc8-67d70ae8c36e";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "BusinessOneUsers";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ConsoleUsers.CONSOLE_ID;
        this.name = ConsoleUsers.CONSOLE_NAME;
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 不在使用此处注册
    }
    /** 运行 */
    run(): void {
        // 加载语言-框架默认
        ibas.i18n.load(this.rootUrl + "resources/languages/businessone.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/company.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/user.json");
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that: ConsoleUsers = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            // 加载用户报表
            let boRepository: BORepositoryBusinessOne = new BORepositoryBusinessOne();
            boRepository.fetchUserCompanies({
                user: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE),
                onCompleted(opRslt: ibas.IOperationResult<bo.UserCompany>): void {
                    if (opRslt.resultCode !== 0) {
                        ibas.logger.log(ibas.emMessageLevel.ERROR, opRslt.message);
                    }
                    for (let item of opRslt.resultObjects) {
                        that.register(new UserCompanyFunc(item));
                    }
                    // 通知初始化完成
                    that.fireInitialized();
                }
            });
        });
        // 保留基类方法
        super.run();
    }
}
