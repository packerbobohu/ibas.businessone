/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "./bo/index";
import * as ibas4j from "./DataDeclarations.d";
import {
} from "../api/index";

/** 数据转换者 */
export class DataConverter4b1 extends ibas.DataConverter4j {

    /** 创建业务对象转换者 */
    protected createConverter(): ibas.BOConverter {
        return new BOConverter4b1;
    }
    /**
     * 转换业务对象数据
     * @param data 本地类型
     * @param sign 特殊标记
     * @returns 目标类型
     */
    convert(data: any, sign: string): any {
        if (ibas.objects.instanceOf(data, bo.UserCompany)) {
            let newData: bo.UserCompany = data;
            let remote: ibas4j.UserCompany = {
                type: data.constructor.name,
                User: newData.user,
                Company: newData.company,
                Url: newData.url,
            };
            return remote;
        } else {
            return super.convert(data, sign);
        }
    }
    /**
     * 解析业务对象数据
     * @param data 目标类型
     * @param sign 特殊标记
     * @returns 本地类型
     */
    parsing(data: any, sign: string): any {
        if (data.type === bo.UserCompany.name) {
            let remote: ibas4j.UserCompany = data;
            let newData: bo.UserCompany = new bo.UserCompany();
            newData.user = remote.User;
            newData.company  = remote.Company;
            newData.url = remote.Url;
            return newData;
        } else {
            return super.parsing(data, sign);
        }
    }
}

/** 业务对象转换者 */
class BOConverter4b1 extends ibas.BOConverter {

    /**
     * 自定义解析
     * @param data 远程数据
     * @returns 本地数据
     */
    protected customParsing(data: any): ibas.IBusinessObject {
        return data;
    }

    /**
     * 转换数据
     * @param boName 对象名称
     * @param property 属性名称
     * @param value 值
     * @returns 转换的值
     */
    protected convertData(boName: string, property: string, value: any): any {
        return super.convertData(boName, property, value);
    }

    /**
     * 解析数据
     * @param boName 对象名称
     * @param property 属性名称
     * @param value 值
     * @returns 解析的值
     */
    protected parsingData(boName: string, property: string, value: any): any {
        return super.parsingData(boName, property, value);
    }
}
