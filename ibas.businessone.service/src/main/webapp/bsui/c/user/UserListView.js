define(["require", "exports", "ibas/index", "openui5/typings/ibas.utils", "../../../borep/bo/index"], function (require, exports, ibas, ibas_utils_1, bo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserListView extends ibas.BOListView {
        get queryTarget() {
            return bo.User;
        }
        darw() {
            let that = this;
            this.form = new sap.ui.layout.form.SimpleForm("");
            this.table = new sap.ui.table.Table("", {
                enableSelectAll: false,
                visibleRowCount: ibas.config.get(ibas_utils_1.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                rows: "{/rows}",
                columns: [
                    new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_user_objectkey"),
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: "objectKey",
                        })
                    }),
                    new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_user_user"),
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: "user",
                        })
                    }),
                    new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_user_company"),
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: "company",
                        })
                    }),
                    new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_user_activated"),
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: "activated",
                            formatter(data) {
                                return ibas.enums.describe(ibas.emYesNo, data);
                            }
                        })
                    }),
                    new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_user_mappeduser"),
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: "mappedUser",
                        })
                    }),
                ]
            });
            this.form.addContent(this.table);
            this.page = new sap.m.Page("", {
                showHeader: false,
                subHeader: new sap.m.Bar("", {
                    contentLeft: [
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_data_new"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://create",
                            press: function () {
                                that.fireViewEvents(that.newDataEvent);
                            }
                        }),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_data_edit"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://edit",
                            press: function () {
                                that.fireViewEvents(that.editDataEvent, ibas_utils_1.utils.getTableSelecteds(that.table).firstOrDefault());
                            }
                        }),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_data_delete"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://delete",
                            press: function () {
                                that.fireViewEvents(that.deleteDataEvent, ibas_utils_1.utils.getTableSelecteds(that.table));
                            }
                        }),
                    ],
                    contentRight: [
                        new sap.m.Button("", {
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://action",
                            press: function (event) {
                                that.fireViewEvents(that.callServicesEvent, {
                                    displayServices(services) {
                                        if (ibas.objects.isNull(services) || services.length === 0) {
                                            return;
                                        }
                                        let popover = new sap.m.Popover("", {
                                            showHeader: false,
                                            placement: sap.m.PlacementType.Bottom,
                                        });
                                        for (let service of services) {
                                            popover.addContent(new sap.m.Button({
                                                text: ibas.i18n.prop(service.name),
                                                type: sap.m.ButtonType.Transparent,
                                                icon: service.icon,
                                                press: function () {
                                                    service.run();
                                                    popover.close();
                                                }
                                            }));
                                        }
                                        popover.addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                        popover.openBy(event.getSource(), true);
                                    }
                                });
                            }
                        })
                    ]
                }),
                content: [this.form]
            });
            this.id = this.page.getId();
            ibas_utils_1.utils.triggerNextResults({
                listener: this.table,
                next(data) {
                    if (ibas.objects.isNull(that.lastCriteria)) {
                        return;
                    }
                    let criteria = that.lastCriteria.next(data);
                    if (ibas.objects.isNull(criteria)) {
                        return;
                    }
                    ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                    that.fireViewEvents(that.fetchDataEvent, criteria);
                }
            });
            return this.page;
        }
        embedded(view) {
            this.page.addHeaderContent(view);
            this.page.setShowHeader(true);
        }
        showData(datas) {
            let done = false;
            let model = this.table.getModel(undefined);
            if (!ibas.objects.isNull(model)) {
                let hDatas = model.getData();
                if (!ibas.objects.isNull(hDatas) && hDatas.rows instanceof Array) {
                    for (let item of datas) {
                        hDatas.rows.push(item);
                    }
                    model.refresh(false);
                    done = true;
                }
            }
            if (!done) {
                this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
            }
            this.table.setBusy(false);
        }
        query(criteria) {
            super.query(criteria);
            this.lastCriteria = criteria;
            if (this.isDisplayed) {
                this.table.setBusy(true);
                this.table.setFirstVisibleRow(0);
                this.table.setModel(null);
            }
        }
    }
    exports.UserListView = UserListView;
});
