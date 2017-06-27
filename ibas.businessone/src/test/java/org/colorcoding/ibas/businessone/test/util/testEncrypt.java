package org.colorcoding.ibas.businessone.test.util;

import org.colorcoding.ibas.businessone.util.Encrypt;

import junit.framework.TestCase;

public class testEncrypt extends TestCase {

	public void testB1() throws Exception {
		String key = "vwC8VltYQpJMLxpbjBgO2ic0jLsEGLog";
		Encrypt encrypt = new Encrypt();
		System.out.println(encrypt.encrypt("https://login3.b1plus.cn:8447/dispatcher/", key));
	}
}
