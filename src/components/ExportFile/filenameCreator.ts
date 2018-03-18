import * as Moment from 'moment';
import { isArray } from 'lodash';
import { DATE_FORMAT } from '../../constants';
const computeTypeMap = {
  detail: 'detail',
  mean: 'avg',
  total: 'sum',
};

export default (
    pageName: string,
    computeType: string,
    dataType: string ,
    time: [ Moment.Moment, Moment.Moment]) => {
  let timeString = '';
  if (isArray(time)) {
    const startTimeFormat = time[0].format(DATE_FORMAT);
    const endTimeFormat = time[1].format(DATE_FORMAT);
    if (startTimeFormat === endTimeFormat) {
      timeString = startTimeFormat;
    } else {
      timeString = `${startTimeFormat} ~ ${endTimeFormat}`;
    }
  }
  return [pageName, computeTypeMap[computeType], dataType, timeString].filter(Boolean).join('_');
};
