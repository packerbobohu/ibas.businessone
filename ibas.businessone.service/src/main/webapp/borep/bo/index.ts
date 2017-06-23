/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 模块索引文件，此文件集中导出类
export * from "./Company";
export * from "./User";
export * from "./UserCompany";

// 注册业务对象到工厂
import * as ibas from "ibas/index";
import { Company } from "./Company";
ibas.boFactory.register(Company.BUSINESS_OBJECT_CODE, Company);
import { User } from "./User";
ibas.boFactory.register(User.BUSINESS_OBJECT_CODE, User);
import { UserCompany } from "./UserCompany";
ibas.boFactory.register(UserCompany);
