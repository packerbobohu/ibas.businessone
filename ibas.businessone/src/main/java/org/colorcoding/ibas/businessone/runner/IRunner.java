package org.colorcoding.ibas.businessone.runner;

import org.colorcoding.ibas.businessone.bo.company.ICompany;
import org.colorcoding.ibas.businessone.bo.user.IUser;

/**
 * 运行者
 * 
 * @author Niuren.Zhu
 *
 */
public interface IRunner {

	ICompany getCompany();

	void setCompany(ICompany company);

	IUser getUser();

	void setUser(IUser user);

	String url();
}
