const useRealIp = Number(localStorage.getItem('realIp'));
export const API_ROOT = (() => {
    if (['localhost', '127.0.0.1'].includes(location.hostname)) {
        return Boolean(useRealIp) ? '/bookStore/webapi' : 'http://127.0.0.1:5000/bookStore/webapi';
    }
    return '/bookStore/webapi';
})();
export const MESSAGE_DURATION = 3000;
export const DATEPICKER_START_DATE = '2018-01-01';
export const DATE_FORMAT = 'YYYY-MM-DD';