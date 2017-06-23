define(["require", "exports", "ibas/index", "./bo/index", "../api/index", "./DataConverters"], function (require, exports, ibas, bo, index_1, DataConverters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BORepositoryBusinessOne extends ibas.BORepositoryApplication {
        createConverter() {
            return new DataConverters_1.DataConverter4b1;
        }
        createRemoteRepository() {
            let boRepository = new ibas.BORepositoryAjax();
            boRepository.address = this.address;
            boRepository.token = this.token;
            boRepository.converter = this.createConverter();
            return boRepository;
        }
        fetchUserCompanies(caller) {
            let remoteRepository = this.createRemoteRepository();
            if (ibas.objects.isNull(remoteRepository)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "remoteRepository"));
            }
            let method = ibas.strings.format("fetchUserCompanies?user={0}&token={1}", caller.user, this.token);
            remoteRepository.callRemoteMethod(method, undefined, caller);
        }
        fetchCompany(fetcher) {
            super.fetch(bo.Company.name, fetcher);
        }
        saveCompany(saver) {
            super.save(bo.Company.name, saver);
        }
        fetchUser(fetcher) {
            super.fetch(bo.User.name, fetcher);
        }
        saveUser(saver) {
            super.save(bo.User.name, saver);
        }
    }
    exports.BORepositoryBusinessOne = BORepositoryBusinessOne;
    ibas.boFactory.register(index_1.BO_REPOSITORY_BUSINESSONE, BORepositoryBusinessOne);
});
