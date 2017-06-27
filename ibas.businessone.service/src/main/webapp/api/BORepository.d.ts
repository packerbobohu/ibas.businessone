/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    FetchCaller,
    SaveCaller,
    MethodCaller,
    IOperationResult,
} from "ibas/index";
import * as bo from "./bo/index"

/** 业务仓库 */
export interface IBORepositoryBusinessOne {

    /**
     * 查询 公司
     * @param fetcher 查询者
     */
    fetchCompany(fetcher: FetchCaller<bo.ICompany>);
    /**
     * 保存 公司
     * @param saver 保存者
     */
    saveCompany(saver: SaveCaller<bo.ICompany>);

    /**
     * 查询 用户
     * @param fetcher 查询者
     */
    fetchUser(fetcher: FetchCaller<bo.IUser>);
    /**
     * 保存 用户
     * @param saver 保存者
     */
    saveUser(saver: SaveCaller<bo.IUser>);
}
/**
 * 关键值相关调用者
 */
export interface KeyMethodsCaller<P> extends MethodCaller {
    /** 关键值 */
    key: string;
    /**
     * 调用完成
     * @param opRslt 结果
     */
    onCompleted(opRslt: IOperationResult<P>): void;
}
