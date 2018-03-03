const useRealIp = localStorage.getItem('realIp');
export const API_ROOT =
    `${['localhost', '127.0.0.1'].includes(location.hostname) && (useRealIp === 'true')
        ? 'http://47.93.202.85' : '' }/bookStore/webapi`;
export const MESSAGE_DURATION = 3000;
export const DATEPICKER_START_DATE = '2018-01-01';
export const DATE_FORMAT = 'YYYY-MM-DD';