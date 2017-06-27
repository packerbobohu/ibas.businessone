/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "./bo/index";
import { IBORepositoryBusinessOne, BO_REPOSITORY_BUSINESSONE, KeyMethodsCaller } from "../api/index";
import { DataConverter4b1 } from "./DataConverters";

/** 业务对象仓库 */
export class BORepositoryBusinessOne extends ibas.BORepositoryApplication implements IBORepositoryBusinessOne {

    /** 创建此模块的后端与前端数据的转换者 */
    protected createConverter(): ibas.IDataConverter {
        return new DataConverter4b1;
    }
    /** 创建远程仓库 */
    protected createRemoteRepository(): ibas.IRemoteRepository {
        let boRepository: ibas.BORepositoryAjax = new ibas.BORepositoryAjax();
        boRepository.address = this.address;
        boRepository.token = this.token;
        boRepository.converter = this.createConverter();
        return boRepository;
    }
	/**
	 * 查询用户公司
	 * @param listener 用户检索监听者
	 */
    fetchUserCompanies(caller: KeyMethodsCaller<ibas.KeyText>): void {
        let remoteRepository: ibas.IRemoteRepository = this.createRemoteRepository();
        if (ibas.objects.isNull(remoteRepository)) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "remoteRepository"));
        }
        let method: string =
            ibas.strings.format("fetchUserCompanies?user={0}&token={1}",
                caller.key, this.token);
        remoteRepository.callRemoteMethod(method, undefined, caller);
    }
	/**
	 * 运行用户公司
	 * @param listener 用户检索监听者
	 */
    runUserCompany(caller: KeyMethodsCaller<ibas.KeyText>): void {
        let remoteRepository: ibas.IRemoteRepository = this.createRemoteRepository();
        if (ibas.objects.isNull(remoteRepository)) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "remoteRepository"));
        }
        let method: string =
            ibas.strings.format("runUserCompany?company={0}&token={1}",
                caller.key, this.token);
        remoteRepository.callRemoteMethod(method, undefined, caller);
    }

    /**
     * 查询 公司
     * @param fetcher 查询者
     */
    fetchCompany(fetcher: ibas.FetchCaller<bo.Company>): void {
        super.fetch(bo.Company.name, fetcher);
    }
    /**
     * 保存 公司
     * @param saver 保存者
     */
    saveCompany(saver: ibas.SaveCaller<bo.Company>): void {
        super.save(bo.Company.name, saver);
    }

    /**
     * 查询 用户
     * @param fetcher 查询者
     */
    fetchUser(fetcher: ibas.FetchCaller<bo.User>): void {
        super.fetch(bo.User.name, fetcher);
    }
    /**
     * 保存 用户
     * @param saver 保存者
     */
    saveUser(saver: ibas.SaveCaller<bo.User>): void {
        super.save(bo.User.name, saver);
    }

}
// 注册业务对象仓库到工厂
ibas.boFactory.register(BO_REPOSITORY_BUSINESSONE, BORepositoryBusinessOne);
