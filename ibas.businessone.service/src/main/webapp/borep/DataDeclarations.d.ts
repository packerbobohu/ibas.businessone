/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/** ibas的java端数据声明 */

/** 操作消息 */
export interface DataDeclaration {
    /** 数据类型 */
    type: string;
}
/** 用户公司 */
export interface UserCompany extends DataDeclaration {
    /** 用户 */
    User: string;
    /** 公司 */
    Company: string;
    /** 地址 */
    Url: string;
}