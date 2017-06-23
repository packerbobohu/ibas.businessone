package org.colorcoding.ibas.businessone.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositorySmartService;
import org.colorcoding.ibas.businessone.bo.company.Company;
import org.colorcoding.ibas.businessone.bo.user.User;
import org.colorcoding.ibas.businessone.bo.users.UserCompany;

/**
 * BusinessOne仓库服务
 */
public interface IBORepositoryBusinessOneSvc extends IBORepositorySmartService {
	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户公司
	 * 
	 * @param user
	 *            用户
	 * @return 操作结果
	 */
	OperationResult<UserCompany> fetchUserCompanies(String user, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-公司
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<Company> fetchCompany(ICriteria criteria, String token);

	/**
	 * 保存-公司
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<Company> saveCompany(Company bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<User> fetchUser(ICriteria criteria, String token);

	/**
	 * 保存-用户
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<User> saveUser(User bo, String token);

	// --------------------------------------------------------------------------------------------//

}
