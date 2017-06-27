package org.colorcoding.ibas.businessone.runner;

import org.colorcoding.ibas.businessone.bo.company.ICompany;
import org.colorcoding.ibas.businessone.bo.user.IUser;

public class RunnerFactory {

	private static RunnerFactory instance;

	public static RunnerFactory create() {
		if (instance == null) {
			synchronized (RunnerFactory.class) {
				if (instance == null) {
					instance = new RunnerFactory();
				}
			}
		}
		return instance;
	}

	public IRunner createRunner() {

		return new IRunner() {

			@Override
			public String url() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public void setUser(IUser user) {
				// TODO Auto-generated method stub

			}

			@Override
			public void setCompany(ICompany company) {
				// TODO Auto-generated method stub

			}

			@Override
			public IUser getUser() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public ICompany getCompany() {
				// TODO Auto-generated method stub
				return null;
			}
		};
	}

}
