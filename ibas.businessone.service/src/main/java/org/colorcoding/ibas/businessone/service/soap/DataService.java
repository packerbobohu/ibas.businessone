package org.colorcoding.ibas.businessone.service.soap;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.cxf.WebServicePath;
import org.colorcoding.ibas.businessone.bo.company.Company;
import org.colorcoding.ibas.businessone.bo.user.User;
import org.colorcoding.ibas.businessone.bo.users.UserCompany;
import org.colorcoding.ibas.businessone.repository.BORepositoryBusinessOne;

/**
 * BusinessOne 数据服务JSON
 */
@WebService
@WebServicePath("data")
public class DataService extends BORepositoryBusinessOne {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户公司
	 * 
	 * @param user
	 *            用户
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<UserCompany> fetchUserCompanies(@WebParam(name = "user") String user,
			@WebParam(name = "token") String token) {
		return super.fetchUserCompanies(user, token);
	}

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
	@WebMethod
	public OperationResult<Company> fetchCompany(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchCompany(criteria, token);
	}

	/**
	 * 保存-公司
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<Company> saveCompany(@WebParam(name = "bo") Company bo,
			@WebParam(name = "token") String token) {
		return super.saveCompany(bo, token);
	}

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
	@WebMethod
	public OperationResult<User> fetchUser(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchUser(criteria, token);
	}

	/**
	 * 保存-用户
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<User> saveUser(@WebParam(name = "bo") User bo, @WebParam(name = "token") String token) {
		return super.saveUser(bo, token);
	}

	// --------------------------------------------------------------------------------------------//

}
