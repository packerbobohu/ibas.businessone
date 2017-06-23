define(["require", "exports", "./Company", "./User", "./UserCompany", "ibas/index", "./Company", "./User", "./UserCompany"], function (require, exports, Company_1, User_1, UserCompany_1, ibas, Company_2, User_2, UserCompany_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Company_1);
    __export(User_1);
    __export(UserCompany_1);
    ibas.boFactory.register(Company_2.Company.BUSINESS_OBJECT_CODE, Company_2.Company);
    ibas.boFactory.register(User_2.User.BUSINESS_OBJECT_CODE, User_2.User);
    ibas.boFactory.register(UserCompany_2.UserCompany);
});
