define(["require", "exports", "ibas/index"], function (require, exports, ibas) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyViewView extends ibas.UrlView {
        constructor() {
            super();
            this.isInside = true;
        }
        darw() {
            return undefined;
        }
        showCompany(data) {
            this.form.setModel(new sap.ui.model.json.JSONModel(data));
        }
    }
    exports.CompanyViewView = CompanyViewView;
});
