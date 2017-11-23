package org.colorcoding.ibas.businessone;

/**
 * 我的配置项
 */
public class MyConfiguration extends org.colorcoding.ibas.bobas.MyConfiguration {

	/**
	 * 模块标识
	 */
	public static final String MODULE_ID = "d89c3bd0-8dab-4f62-8439-0b8a39c66bf2";

	/**
	 * 命名空间
	 */
	public static final String NAMESPACE_ROOT = "http://colorcoding.org/ibas/businessone/";

	/**
	 * 数据命名空间
	 */
	public static final String NAMESPACE_DATA = NAMESPACE_ROOT + "data";

	/**
	 * 业务对象命名空间
	 */
	public static final String NAMESPACE_BO = NAMESPACE_ROOT + "bo";

	/**
	 * 服务命名空间
	 */
	public static final String NAMESPACE_SERVICE = NAMESPACE_ROOT + "service";
	/**
	 * 配置项目-文件文件夹
	 */
	public final static String CONFIG_ITEM_BUSINESSONE_FILE_FOLDER = "B1FileFolder";
	/**
	 * 变量名称，公司地址
	 */
	public static final String PARAMETER_NAME_COMPANY_URL = "${Url}";
}
