package org.colorcoding.ibas.businessone.runner;

import org.colorcoding.ibas.businessone.bo.company.ICompany;
import org.colorcoding.ibas.businessone.bo.user.IUser;

/**
 * B1运行者
 * 
 * @author Niuren.Zhu
 *
 */
public class Runner implements IRunner {

	private ICompany company;

	@Override
	public ICompany getCompany() {
		return this.company;
	}

	@Override
	public void setCompany(ICompany company) {
		this.company = company;
	}

	private IUser user;

	@Override
	public IUser getUser() {
		return this.user;
	}

	@Override
	public void setUser(IUser user) {
		this.user = user;
	}

	@Override
	public String url() {
		StringBuilder address = new StringBuilder();
		// 服务地址
		address.append(this.getCompany().getServer());
		address.append("?");
		// 账号
		address.append("user=");
		address.append(this.getUser().getMappedUser());
		// 密码
		address.append("&");
		address.append("password=");
		address.append(this.getUser().getPassword());
		// 客户端地址
		address.append("&");
		address.append("client=");
		address.append(this.getCompany().getAddress());
		return address.toString();
	}

}
