package org.colorcoding.ibas.businessone.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.data.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.repository.*;
import org.colorcoding.ibas.businessone.data.*;
import org.colorcoding.ibas.businessone.bo.company.*;
import org.colorcoding.ibas.businessone.repository.*;

/**
* 公司 测试
* 
*/
public class testCompany extends TestCase {
    /**
     * 获取连接口令
    */
    String getToken() {
        return "";
    }
    
    /**
     * 基本项目测试
     * @throws Exception 
    */
    public void testBasicItems() throws Exception {
        Company bo = new Company();
        // 测试属性赋值


        // 测试对象的保存和查询
        IOperationResult<?> operationResult = null;
        ICriteria criteria = null;
        IBORepositoryBusinessOneApp boRepository = new BORepositoryBusinessOne();
        //设置用户口令
        boRepository.setUserToken(this.getToken());

        // 测试保存
        operationResult = boRepository.saveCompany(bo);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        Company boSaved = (Company)operationResult.getResultObjects().firstOrDefault();


        // 测试查询
        criteria = boSaved.getCriteria();
        criteria.setResultCount(10);
        operationResult = boRepository.fetchCompany(criteria);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);


    }

}
