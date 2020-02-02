"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static isValidNumber(number) {
        return (!Number.isNaN(number) && number >= 0);
    }
    static metaDataPagination(page, totalPages, size, apiUrl) {
        let metaData = new Object();
        metaData["currentPage"] = page;
        metaData["totalPages"] = totalPages;
        metaData["numElements"] = size;
        metaData["links"] = new Array();
        metaData["links"].push({ "self": `${apiUrl}?page=${page}&size=${size}` });
        metaData["links"].push({ "first": `${apiUrl}?page=1&size=${size}` });
        if (page > 1)
            metaData["links"].push({ "previous": `${apiUrl}?page=${(page > 1) ? page - 1 : page}&size=${size}` });
        if (page < totalPages)
            metaData["links"].push({ "next": `${apiUrl}?page=${(page < totalPages) ? page + 1 : page}&size=${size}` });
        metaData["links"].push({ "last": `${apiUrl}?page=${totalPages}&size=${size}` });
        return metaData;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map