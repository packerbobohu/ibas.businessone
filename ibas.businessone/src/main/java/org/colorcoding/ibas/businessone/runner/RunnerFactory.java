package org.colorcoding.ibas.businessone.runner;

import org.colorcoding.ibas.businessone.data.emRunType;

/**
 * 运行者工厂
 * 
 * @author Niuren.Zhu
 *
 */
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

	public IRunner create(emRunType type) {

		return new Runner();
	}

}
