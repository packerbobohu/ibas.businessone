define(["require", "exports", "ibas/index", "../../api/index"], function (require, exports, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Company extends index_1.BOSimple {
        constructor() {
            super();
        }
        get name() {
            return this.getProperty(Company.PROPERTY_NAME_NAME);
        }
        set name(value) {
            this.setProperty(Company.PROPERTY_NAME_NAME, value);
        }
        get description() {
            return this.getProperty(Company.PROPERTY_DESCRIPTION_NAME);
        }
        set description(value) {
            this.setProperty(Company.PROPERTY_DESCRIPTION_NAME, value);
        }
        get activated() {
            return this.getProperty(Company.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(Company.PROPERTY_ACTIVATED_NAME, value);
        }
        get server() {
            return this.getProperty(Company.PROPERTY_SERVER_NAME);
        }
        set server(value) {
            this.setProperty(Company.PROPERTY_SERVER_NAME, value);
        }
        get user() {
            return this.getProperty(Company.PROPERTY_USER_NAME);
        }
        set user(value) {
            this.setProperty(Company.PROPERTY_USER_NAME, value);
        }
        get password() {
            return this.getProperty(Company.PROPERTY_PASSWORD_NAME);
        }
        set password(value) {
            this.setProperty(Company.PROPERTY_PASSWORD_NAME, value);
        }
        get address() {
            return this.getProperty(Company.PROPERTY_ADDRESS_NAME);
        }
        set address(value) {
            this.setProperty(Company.PROPERTY_ADDRESS_NAME, value);
        }
        get objectKey() {
            return this.getProperty(Company.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(Company.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(Company.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(Company.PROPERTY_OBJECTCODE_NAME, value);
        }
        get logInst() {
            return this.getProperty(Company.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(Company.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(Company.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(Company.PROPERTY_SERIES_NAME, value);
        }
        get dataSource() {
            return this.getProperty(Company.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(Company.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(Company.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(Company.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(Company.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(Company.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(Company.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(Company.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(Company.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(Company.PROPERTY_UPDATETIME_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(Company.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(Company.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(Company.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(Company.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(Company.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(Company.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(Company.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(Company.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get dataOwner() {
            return this.getProperty(Company.PROPERTY_DATAOWNER_NAME);
        }
        set dataOwner(value) {
            this.setProperty(Company.PROPERTY_DATAOWNER_NAME, value);
        }
        get teamMembers() {
            return this.getProperty(Company.PROPERTY_TEAMMEMBERS_NAME);
        }
        set teamMembers(value) {
            this.setProperty(Company.PROPERTY_TEAMMEMBERS_NAME, value);
        }
        get organization() {
            return this.getProperty(Company.PROPERTY_ORGANIZATION_NAME);
        }
        set organization(value) {
            this.setProperty(Company.PROPERTY_ORGANIZATION_NAME, value);
        }
        init() {
            this.objectCode = index_1.config.applyVariables(Company.BUSINESS_OBJECT_CODE);
        }
    }
    Company.BUSINESS_OBJECT_CODE = index_2.BO_CODE_COMPANY;
    Company.PROPERTY_NAME_NAME = "Name";
    Company.PROPERTY_DESCRIPTION_NAME = "Description";
    Company.PROPERTY_ACTIVATED_NAME = "Activated";
    Company.PROPERTY_SERVER_NAME = "Server";
    Company.PROPERTY_USER_NAME = "User";
    Company.PROPERTY_PASSWORD_NAME = "Password";
    Company.PROPERTY_ADDRESS_NAME = "Address";
    Company.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    Company.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    Company.PROPERTY_LOGINST_NAME = "LogInst";
    Company.PROPERTY_SERIES_NAME = "Series";
    Company.PROPERTY_DATASOURCE_NAME = "DataSource";
    Company.PROPERTY_CREATEDATE_NAME = "CreateDate";
    Company.PROPERTY_CREATETIME_NAME = "CreateTime";
    Company.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    Company.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    Company.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    Company.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    Company.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    Company.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    Company.PROPERTY_DATAOWNER_NAME = "DataOwner";
    Company.PROPERTY_TEAMMEMBERS_NAME = "TeamMembers";
    Company.PROPERTY_ORGANIZATION_NAME = "Organization";
    exports.Company = Company;
});
