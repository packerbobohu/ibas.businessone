package org.colorcoding.ibas.businessone.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.repository.IBORepositoryApplication;
import org.colorcoding.ibas.businessone.bo.company.ICompany;
import org.colorcoding.ibas.businessone.bo.user.IUser;

/**
 * BusinessOne仓库应用
 */
public interface IBORepositoryBusinessOneApp extends IBORepositoryApplication {
	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户公司
	 * 
	 * @param user
	 *            用户
	 * @return 操作结果
	 */
	IOperationResult<KeyText> fetchUserCompanies(String user);

	/**
	 * 运行-用户公司
	 * 
	 * @param company
	 *            公司
	 * @return 操作结果
	 */
	IOperationResult<KeyText> runUserCompany(String company);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-公司
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<ICompany> fetchCompany(ICriteria criteria);

	/**
	 * 保存-公司
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<ICompany> saveCompany(ICompany bo);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-用户
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IUser> fetchUser(ICriteria criteria);

	/**
	 * 保存-用户
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IUser> saveUser(IUser bo);

	// --------------------------------------------------------------------------------------------//

}
