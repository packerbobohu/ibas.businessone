define(["require", "exports", "ibas/index", "openui5/typings/ibas.utils"], function (require, exports, ibas, ibas_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyEditView extends ibas.BOEditView {
        darw() {
            let that = this;
            this.form = new sap.ui.layout.form.SimpleForm("", {
                content: [
                    new sap.ui.core.Title("", { text: ibas.i18n.prop("businessone_basis_information") }),
                    new sap.m.Label("", { text: ibas.i18n.prop("bo_company_name") }),
                    new sap.m.Input("", {
                        type: sap.m.InputType.Text
                    }).bindProperty("value", {
                        path: "/name"
                    }),
                    new sap.m.Label("", { text: ibas.i18n.prop("bo_company_description") }),
                    new sap.m.Input("", {
                        type: sap.m.InputType.Text
                    }).bindProperty("value", {
                        path: "/description"
                    }),
                    new sap.m.Label("", { text: ibas.i18n.prop("bo_company_activated") }),
                    new sap.m.Select("", {
                        items: ibas_utils_1.utils.createComboBoxItems(ibas.emYesNo)
                    }).bindProperty("selectedKey", {
                        path: "/activated",
                        type: "sap.ui.model.type.Integer"
                    }),
                    new sap.m.Label("", { text: ibas.i18n.prop("bo_company_address") }),
                    new sap.m.Input("", {}).bindProperty("value", {
                        path: "/address"
                    }),
                    new sap.ui.core.Title("", { text: ibas.i18n.prop("businessone_other_information") }),
                    new sap.m.Label("", { text: ibas.i18n.prop("bo_company_objectkey") }),
                    new sap.m.Input("", {
                        enabled: false,
                        type: sap.m.InputType.Text
                    }).bindProperty("value", {
                        path: "/objectKey"
                    }),
                    new sap.m.Label("", { text: ibas.i18n.prop("bo_company_objectcode") }),
                    new sap.m.Input("", {
                        enabled: false,
                        type: sap.m.InputType.Text
                    }).bindProperty("value", {
                        path: "/objectCode"
                    }),
                ]
            });
            this.page = new sap.m.Page("", {
                showHeader: false,
                subHeader: new sap.m.Toolbar("", {
                    content: [
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_data_save"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://save",
                            press: function () {
                                that.fireViewEvents(that.saveDataEvent);
                            }
                        }),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_data_delete"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://delete",
                            press: function () {
                                that.fireViewEvents(that.deleteDataEvent);
                            }
                        }),
                        new sap.m.ToolbarSeparator(""),
                        new sap.m.MenuButton("", {
                            text: ibas.i18n.prop("sys_shell_data_new"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://create",
                            buttonMode: sap.m.MenuButtonMode.Split,
                            defaultAction: function () {
                                that.fireViewEvents(that.createDataEvent, false);
                            },
                            menu: new sap.m.Menu("", {
                                items: [
                                    new sap.m.MenuItem("", {
                                        text: ibas.i18n.prop("sys_shell_data_new"),
                                        icon: "sap-icon://create"
                                    }),
                                    new sap.m.MenuItem("", {
                                        text: ibas.i18n.prop("sys_shell_data_clone"),
                                        icon: "sap-icon://copy"
                                    }),
                                ],
                                itemSelected: function (event) {
                                    let item = event.getParameter("item");
                                    if (item instanceof sap.m.MenuItem) {
                                        if (item.getIcon() === "sap-icon://copy") {
                                            that.fireViewEvents(that.createDataEvent, true);
                                        }
                                        else {
                                            that.fireViewEvents(that.createDataEvent, false);
                                        }
                                    }
                                }
                            })
                        }),
                    ]
                }),
                content: [this.form]
            });
            this.id = this.page.getId();
            return this.page;
        }
        changeViewStatus(data) {
            if (ibas.objects.isNull(data)) {
                return;
            }
            if (data.isNew) {
                if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                    ibas_utils_1.utils.changeToolbarDeletable(this.page.getSubHeader(), false);
                }
            }
        }
        showCompany(data) {
            this.form.setModel(new sap.ui.model.json.JSONModel(data));
            ibas_utils_1.utils.refreshModelChanged(this.form, data);
            this.changeViewStatus(data);
        }
    }
    exports.CompanyEditView = CompanyEditView;
});
