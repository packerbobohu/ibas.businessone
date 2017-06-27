package org.colorcoding.ibas.businessone.service.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.businessone.bo.company.Company;
import org.colorcoding.ibas.businessone.bo.user.User;
import org.colorcoding.ibas.businessone.repository.BORepositoryBusinessOne;

/**
 * BusinessOne 数据服务JSON
 */
@Path("data")
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUserCompanies")
	public OperationResult<KeyText> fetchUserCompanies(@QueryParam("user") String user,
			@QueryParam("token") String token) {
		return super.fetchUserCompanies(user, token);
	}

	/**
	 * 运行-用户公司
	 * 
	 * @param company
	 *            公司
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("runUserCompany")
	public OperationResult<KeyText> runUserCompany(@QueryParam("company") String company,
			@QueryParam("token") String token) {
		return super.runUserCompany(company, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchCompany")
	public OperationResult<Company> fetchCompany(Criteria criteria, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveCompany")
	public OperationResult<Company> saveCompany(Company bo, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUser")
	public OperationResult<User> fetchUser(Criteria criteria, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveUser")
	public OperationResult<User> saveUser(User bo, @QueryParam("token") String token) {
		return super.saveUser(bo, token);
	}

	// --------------------------------------------------------------------------------------------//

}
