package org.colorcoding.ibas.businessone.bo.users;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.businessone.bo.user.IUser;

/**
 * 用户公司
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserCompany")
@XmlRootElement(name = "UserCompany")
public class UserCompany {

	public static UserCompany create(IUser boItem) {
		UserCompany userCompany = new UserCompany();
		userCompany.setCompany(boItem.getCompany());
		userCompany.setUser(boItem.getUser());
		return userCompany;
	}

	@XmlElement(name = "Company")
	private String company;

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	@XmlElement(name = "User")
	private String user;

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	@XmlElement(name = "Url")
	private String url;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return String.format("{userCompany: %s|%s}", this.getUser(), this.getCompany());
	}
}
