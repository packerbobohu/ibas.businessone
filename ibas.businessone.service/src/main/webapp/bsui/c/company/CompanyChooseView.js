define(["require", "exports", "ibas/index", "openui5/typings/ibas.utils", "../../../borep/bo/index"], function (require, exports, ibas, ibas_utils_1, bo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompanyChooseView extends ibas.BOChooseView {
        get queryTarget() {
            return bo.Company;
        }
        darwBars() {
            let that = this;
            return [
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_data_new"),
                    type: sap.m.ButtonType.Transparent,
                    press: function () {
                        that.fireViewEvents(that.newDataEvent);
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_data_choose"),
                    type: sap.m.ButtonType.Transparent,
                    press: function () {
                        that.fireViewEvents(that.chooseDataEvent, ibas_utils_1.utils.getTableSelecteds(that.table));
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_exit"),
                    type: sap.m.ButtonType.Transparent,
                    press: function () {
                        that.fireViewEvents(that.closeEvent);
                    }
                }),
            ];
        }
        darw() {
            let that = this;
            this.table = new sap.ui.table.Table("", {
                enableSelectAll: false,
                visibleRowCount: ibas.config.get(ibas_utils_1.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                rows: "{/rows}",
                columns: [
                    new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_company_objectkey"),
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: "objectKey",
                        })
                    }),
                    new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_company_name"),
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: "name",
                        })
                    }),
                    new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_company_activated"),
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
                        label: ibas.i18n.prop("bo_company_description"),
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: "description",
                        })
                    }),
                ]
            });
            this.id = this.table.getId();
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
            return this.table;
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
    exports.CompanyChooseView = CompanyChooseView;
});
