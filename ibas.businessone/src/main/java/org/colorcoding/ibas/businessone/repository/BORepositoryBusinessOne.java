package org.colorcoding.ibas.businessone.repository;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.ownership.PermissionGroup;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.businessone.bo.company.Company;
import org.colorcoding.ibas.businessone.bo.company.ICompany;
import org.colorcoding.ibas.businessone.bo.user.IUser;
import org.colorcoding.ibas.businessone.bo.user.User;
import org.colorcoding.ibas.businessone.bo.users.UserCompany;

/**
 * BusinessOne仓库
 */
@PermissionGroup("BusinessOne")
public class BORepositoryBusinessOne extends BORepositoryServiceApplication
		implements IBORepositoryBusinessOneSvc, IBORepositoryBusinessOneApp {

	// --------------------------------------------------------------------------------------------//
	@Override
	public IOperationResult<UserCompany> fetchUserCompanies(String user) {
		return this.fetchUserCompanies(user, this.getUserToken());
	}

	@Override
	public OperationResult<UserCompany> fetchUserCompanies(String user, String token) {
		OperationResult<UserCompany> opRslt = new OperationResult<UserCompany>();
		try {
			this.setUserToken(token);
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(User.PROPERTY_USER.getName());
			condition.setValue(user);
			condition = criteria.getConditions().create();
			condition.setAlias(User.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			IOperationResult<User> opRsltUser = this.fetchUser(criteria, token);
			if (opRsltUser.getError() != null) {
				throw opRsltUser.getError();
			}
			if (opRsltUser.getResultCode() != 0) {
				throw new Exception(opRsltUser.getMessage());
			}
			if (opRsltUser.getResultObjects().size() == 0) {
				// 未定义用户公司
				return opRslt;
			}
			// 获取公司信息
			criteria = new Criteria();
			for (IUser item : opRsltUser.getResultObjects()) {
				condition = criteria.getConditions().create();
				condition.setAlias(Company.PROPERTY_NAME.getName());
				condition.setValue(item.getCompany());
				condition = criteria.getConditions().create();
				condition.setAlias(Company.PROPERTY_ACTIVATED.getName());
				condition.setValue(emYesNo.YES);
			}
			IOperationResult<Company> opRsltCompany = this.fetchCompany(criteria, token);
			if (opRsltCompany.getError() != null) {
				throw opRsltCompany.getError();
			}
			if (opRsltCompany.getResultCode() != 0) {
				throw new Exception(opRsltCompany.getMessage());
			}
			for (ICompany item : opRsltCompany.getResultObjects()) {
				UserCompany userCompany = new UserCompany();
				userCompany.setUser(user);
				userCompany.setCompany(item.getName());
				userCompany.setUrl(item.getAddress());
				opRslt.addResultObjects(userCompany);
			}
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
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
	public OperationResult<Company> fetchCompany(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Company.class);
	}

	/**
	 * 查询-公司（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<ICompany> fetchCompany(ICriteria criteria) {
		return new OperationResult<ICompany>(this.fetchCompany(criteria, this.getUserToken()));
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
	public OperationResult<Company> saveCompany(Company bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-公司（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<ICompany> saveCompany(ICompany bo) {
		return new OperationResult<ICompany>(this.saveCompany((Company) bo, this.getUserToken()));
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
	public OperationResult<User> fetchUser(ICriteria criteria, String token) {
		return super.fetch(criteria, token, User.class);
	}

	/**
	 * 查询-用户（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IUser> fetchUser(ICriteria criteria) {
		return new OperationResult<IUser>(this.fetchUser(criteria, this.getUserToken()));
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
	public OperationResult<User> saveUser(User bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-用户（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IUser> saveUser(IUser bo) {
		return new OperationResult<IUser>(this.saveUser((User) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

}
