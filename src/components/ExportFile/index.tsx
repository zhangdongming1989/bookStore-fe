import * as React from 'react';
import { Button } from 'antd';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import filenameCreator from './filenameCreator';

export {filenameCreator};
// tslint:disable
function s2ab(s: string) {
  if (typeof ArrayBuffer !== 'undefined') {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i){
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  } else {
    const buf = new Array(s.length);
    for (let i=0; i!==s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}

/**
 * 将 data 中 key 为英文的 数据根据 columns 改为 key 是中文
 * @param data
 * @param columns
 * returning: formatted data
 */
const exportFormatter = (data:any, columns:any) => {
    const columnsKeys = columns.map((val: any) => val.dataIndex)
    const mapDataIndexToChineseName = columns.reduce((prev: any , val: any) => {
      const {dataIndex, title} = val;
      return {
          ...prev,
          [dataIndex]: title,
      }
    }, {})
    return data.map((val:any) => columnsKeys.reduce((prev:any, key:any) => {
        return {
            ...prev,
            [mapDataIndexToChineseName[key]]: val[key],
        }
    }, {}))
}

const columnsChineseKeysCreator = (columns:any) => columns.map((val: any) => val.title)


interface Props {
  data: any[],
  columns: any;
  filename: string;
  disabled?: boolean;
}
export default class ExportFile extends React.Component<Props> {
  handleClick = () => {
    const {data, columns, filename} = this.props
    const formattedData = exportFormatter(data, columns)
    const chineseColumns = columnsChineseKeysCreator(columns)
    if(data.length && columns.length) {
      const ws = XLSX.utils.json_to_sheet(formattedData, { header: chineseColumns})
      const wb = {Sheets:{'sheet': ws}, SheetNames: ['sheet']}
      const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'})
      const blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
      FileSaver.saveAs(blob, `${filename}.xlsx`)
    }
  }

  render() {
    const {data, disabled} = this.props
    return (
      <Button onClick={this.handleClick} disabled={typeof disabled === 'undefined' ? !data || !data.length : disabled}>导出</Button>
    )
  }
}

export const createExcel = (data: any[], columns: any, filename: string) => {
    const formattedData = exportFormatter(data, columns)
    const chineseColumns = columnsChineseKeysCreator(columns)
    if(data.length && columns.length) {
        const ws = XLSX.utils.json_to_sheet(formattedData, { header: chineseColumns})
        const wb = {Sheets:{'sheet': ws}, SheetNames: ['sheet']}
        const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'})
        const blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
        FileSaver.saveAs(blob, `${filename}.xlsx`)
    }
}