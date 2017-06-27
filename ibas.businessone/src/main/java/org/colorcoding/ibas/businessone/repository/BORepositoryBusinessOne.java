package org.colorcoding.ibas.businessone.repository;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.ownership.PermissionGroup;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.businessone.MyConsts;
import org.colorcoding.ibas.businessone.bo.company.Company;
import org.colorcoding.ibas.businessone.bo.company.ICompany;
import org.colorcoding.ibas.businessone.bo.user.IUser;
import org.colorcoding.ibas.businessone.bo.user.User;
import org.colorcoding.ibas.businessone.util.Encrypt;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

/**
 * BusinessOne仓库
 */
@PermissionGroup("BusinessOne")
public class BORepositoryBusinessOne extends BORepositoryServiceApplication
		implements IBORepositoryBusinessOneSvc, IBORepositoryBusinessOneApp {

	// --------------------------------------------------------------------------------------------//
	@Override
	public IOperationResult<KeyText> fetchUserCompanies(String user) {
		return this.fetchUserCompanies(user, this.getUserToken());
	}

	@Override
	public OperationResult<KeyText> fetchUserCompanies(String user, String token) {
		OperationResult<KeyText> opRslt = new OperationResult<KeyText>();
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
				KeyText keyText = new KeyText();
				keyText.setKey(item.getName());
				keyText.setText(item.getDescription() != null && !item.getDescription().isEmpty()
						? item.getDescription() : item.getName());
				opRslt.addResultObjects(keyText);
			}
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

	@Override
	public IOperationResult<KeyText> runUserCompany(String user) {
		return this.runUserCompany(user, this.getUserToken());
	}

	@Override
	public OperationResult<KeyText> runUserCompany(String company, String token) {
		OperationResult<KeyText> opRslt = new OperationResult<KeyText>();
		try {
			this.setUserToken(token);
			// 查询系统用户
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_DOCENTRY.getName());
			condition.setValue(this.getCurrentUser().getId());
			condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			BORepositoryInitialFantasy ifRepository = new BORepositoryInitialFantasy();
			ifRepository.setRepository(this.getRepository());
			IOperationResult<org.colorcoding.ibas.initialfantasy.bo.organizations.User> opRsltSysUser = ifRepository
					.fetchUser(criteria, token);
			if (opRsltSysUser.getError() != null) {
				throw opRsltSysUser.getError();
			}
			org.colorcoding.ibas.initialfantasy.bo.organizations.User user = opRsltSysUser.getResultObjects()
					.firstOrDefault();
			if (user == null) {
				throw new Exception(i18n.prop("msg_b1_system_user_not_exist"));
			}
			// 查询绑定用户
			criteria = new Criteria();
			condition = criteria.getConditions().create();
			condition.setAlias(User.PROPERTY_USER.getName());
			condition.setValue(user.getCode());
			condition = criteria.getConditions().create();
			condition.setAlias(User.PROPERTY_COMPANY.getName());
			condition.setValue(company);
			condition = criteria.getConditions().create();
			condition.setAlias(User.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			IOperationResult<User> opRsltUser = this.fetchUser(criteria, token);
			if (opRsltUser.getError() != null) {
				throw opRsltUser.getError();
			}
			User userCompany = opRsltUser.getResultObjects().firstOrDefault();
			if (userCompany == null) {
				throw new Exception(i18n.prop("msg_b1_user_no_company_available",
						user.getName() != null && !user.getName().isEmpty() ? user.getName() : user.getCode()));
			}
			// 获取公司信息
			criteria = new Criteria();
			condition = criteria.getConditions().create();
			condition.setAlias(Company.PROPERTY_NAME.getName());
			condition.setValue(userCompany.getCompany());
			condition = criteria.getConditions().create();
			condition.setAlias(Company.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			IOperationResult<Company> opRsltCompany = this.fetchCompany(criteria, token);
			if (opRsltCompany.getError() != null) {
				throw opRsltCompany.getError();
			}
			Company mCompany = opRsltCompany.getResultObjects().firstOrDefault();
			if (mCompany == null) {
				throw new Exception(i18n.prop("msg_b1_company_unavailable", userCompany.getCompany()));
			}
			Encrypt encrypt = new Encrypt();
			String key = encrypt.random(32);
			StringBuilder address = new StringBuilder();
			// 服务地址
			address.append(mCompany.getServer());
			address.append("?");
			// 账号
			address.append("a1=");
			address.append(encrypt.encrypt(userCompany.getMappedUser(), key));
			// 密码
			address.append("&");
			address.append("c3=");
			address.append(encrypt.encrypt(userCompany.getPassword(), key));
			// 客户端地址
			address.append("&");
			address.append("d4=");
			address.append(encrypt.encrypt(mCompany.getAddress(), key));
			// 钥匙
			address.append("&");
			address.append("pa=");
			address.append(key);
			opRslt.addResultObjects(new KeyText(MyConsts.PARAMETER_NAME_COMPANY_URL, address.toString()));
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
