package org.colorcoding.ibas.businessone.runner;

import org.colorcoding.ibas.businessone.bo.company.ICompany;
import org.colorcoding.ibas.businessone.bo.user.IUser;

/**
 * B1运行者
 * 
 * @author Niuren.Zhu
 *
 */
public interface IRunner {

	/**
	 * 获取-公司
	 * 
	 * @return
	 */
	ICompany getCompany();

	/**
	 * 设置-公司
	 * 
	 * @param company
	 */
	void setCompany(ICompany company);

	/**
	 * 获取-用户
	 * 
	 * @return
	 */
	IUser getUser();

	/**
	 * 设置-用户
	 * 
	 * @param user
	 */
	void setUser(IUser user);

	/**
	 * 地址
	 * 
	 * @return
	 */
	String url();
}
