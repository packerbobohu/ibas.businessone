define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BO_REPOSITORY_INITIALFANTASY = "BORepositoryInitialFantasy";
    exports.BO_CODE_APPLICATIONFUNCTION = "${Company}_SYS_FUNCTION";
    exports.BO_CODE_APPLICATIONMODULE = "${Company}_SYS_MODULE";
    exports.BO_CODE_APPLICATIONPLATFORM = "${Company}_SYS_PLATFORM";
    exports.BO_CODE_APPROVALREQUEST = "${Company}_AP_APPROVALREQU";
    exports.BO_CODE_APPROVALTEMPLATE = "${Company}_AP_APPROVALTPLT";
    exports.BO_CODE_BOCRITERIA = "${Company}_SYS_BOCRITERIA";
    exports.BO_CODE_BOFILTERING = "${Company}_SYS_BOFILTERING";
    exports.BO_CODE_ORGANIZATION = "${Company}_SYS_ORGANIZATION";
    exports.BO_CODE_ORGANIZATIONALSTRUCTURE = "${Company}_SYS_ORG_STRUCTURE";
    exports.BO_CODE_OWNERSHIP = "${Company}_SYS_OWNERSHIP";
    exports.BO_CODE_PRIVILEGE = "${Company}_SYS_PRIVILEGE";
    exports.BO_CODE_ROLE = "${Company}_SYS_ROLE";
    exports.BO_CODE_USER = "${Company}_SYS_USER";
    exports.BO_CODE_SYSTEM_VARIABLE = "${Company}_SYS_VARIABLE";
    var emApprovalStepOwnerType;
    (function (emApprovalStepOwnerType) {
        emApprovalStepOwnerType[emApprovalStepOwnerType["USER"] = 0] = "USER";
    })(emApprovalStepOwnerType = exports.emApprovalStepOwnerType || (exports.emApprovalStepOwnerType = {}));
    var emApprovalConditionType;
    (function (emApprovalConditionType) {
        emApprovalConditionType[emApprovalConditionType["PROPERTY_VALUE"] = 0] = "PROPERTY_VALUE";
        emApprovalConditionType[emApprovalConditionType["SQL_SCRIPT"] = 1] = "SQL_SCRIPT";
    })(emApprovalConditionType = exports.emApprovalConditionType || (exports.emApprovalConditionType = {}));
    var emAssignedType;
    (function (emAssignedType) {
        emAssignedType[emAssignedType["USER"] = 0] = "USER";
        emAssignedType[emAssignedType["ROLE"] = 1] = "ROLE";
    })(emAssignedType = exports.emAssignedType || (exports.emAssignedType = {}));
});
