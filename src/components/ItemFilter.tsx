// import * as React from 'react';
// import * as moment from 'moment';
// import { DatePicker } from 'antd';
// import FormItem from 'antd/lib/form/FormItem';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
// import { DATEPICKER_START_DATE, DATE_FORMAT } from '../constants';
//
// const { RangePicker } = DatePicker;
//
// interface ItemFilterProps {
//     form: WrappedFormUtils;
// }
//
// export const disabledDate = (curMoment: moment.Moment) => {
//     const yesterdayMoment = moment().subtract(1, 'days')
//     const datePickerStartMoment = moment(DATEPICKER_START_DATE, DATE_FORMAT)
//     return curMoment.isBefore(datePickerStartMoment) || curMoment.isAfter(yesterdayMoment);
// }
//
// export default class ItemFilter extends React.Component<ItemFilterProps> {
//     render() {
//         const { form } = this.props;
//         const {getFieldDecorator} = form;
//         return (
//          <div>
//              <FormItem>
//                  {
//
//                      getFieldDecorator('date')(
//                          <RangePicker
//                              allowClear={false}
//                              disabledDate={disabledDate}
//                          />
//                      )
//                  }
//              </FormItem>
//
//          </div>
//         );
//     }
// }