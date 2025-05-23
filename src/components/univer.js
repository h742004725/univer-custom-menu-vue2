import {DEFAULT_TEXT_FORMAT_EXCEL} from '@univerjs/engine-numfmt';

const data = {
  "id": "univer-sheet",
  "sheetOrder": [],
  "name": "univer-sheet",
  "appVersion": "0.5.0",
  "locale": "zhCN",
  "styles": {
    "dlO58m": {
      "n": {
        "pattern": DEFAULT_TEXT_FORMAT_EXCEL
      },
      "bd": {
        "r": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "t": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "b": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "l": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        }
      }
    },
    "TranFail": {
      "ff": "Microsoft YaHei",
      "fs": 12,
      "it": 0,
      "bl": 0,
      "ul": {
        "s": 0
      },
      "st": {
        "s": 0
      },
      "ol": {
        "s": 0
      },
      "tr": {
        "a": 0,
        "v": 0
      },
      "td": 0,
      "ht": 1,
      "vt": 2,
      "tb": 0,
      "pd": {
        "t": 0,
        "b": 2,
        "l": 2,
        "r": 2
      },
      "n": {
        "pattern": "@"
      },
      "bg": {
        "rgb": "red"
      },
      "bd": {
        "r": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "t": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "b": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "l": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        }
      }
    },
    "HmnANW": {
      "ff": "Microsoft YaHei",
      "fs": 12,
      "it": 0,
      "bl": 1,
      "ul": {
        "s": 0
      },
      "st": {
        "s": 0
      },
      "ol": {
        "s": 0
      },
      "tr": {
        "a": 0,
        "v": 0
      },
      "td": 0,
      "ht": 1,
      "vt": 2,
      "tb": 0,
      "pd": {
        "t": 0,
        "b": 2,
        "l": 2,
        "r": 2
      },
      "n": {
        "pattern": "@"
      },
      "bg": {
        "rgb": "#fff4b9"
      },
      "bd": {
        "r": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "t": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "b": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "l": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        }
      }
    },
    "HmnANE": {
      "ff": "Microsoft YaHei",
      "fs": 12,
      "it": 0,
      "bl": 1,
      "ul": {
        "s": 0
      },
      "st": {
        "s": 0
      },
      "ol": {
        "s": 0
      },
      "tr": {
        "a": 0,
        "v": 0
      },
      "td": 0,
      "ht": 1,
      "vt": 2,
      "tb": 0,
      "pd": {
        "t": 0,
        "b": 2,
        "l": 2,
        "r": 2
      },
      "n": {
        "pattern": "@"
      },
      "bg": {
        "rgb": "#F2F2F2"
      },
      "bd": {
        "r": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "t": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "b": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        },
        "l": {
          "s": 1,
          "cl": {
            "rgb": "#000000"
          }
        }
      }
    },
  },
  "sheets": {},
  "resources": [
    {
      "name": "SHEET_DEFINED_NAME_PLUGIN",
      "data": ""
    }
  ]
}

/**
 * univer初始化
 * @param tableName
 * @returns {{appVersion: string, sheets: {}, sheetOrder: *[], name: string, resources: [{data: string, name: string}], styles: {}, id: string, locale: string}}
 */
export function univerInit(tableName, cellData, isBussiness) {
  let sheetName = tableName ? tableName : 'sheet1'
  // 先判断sheetOrder中是否存在该sheetName，如果存在则不添加
  if (data.sheetOrder.indexOf(sheetName) === -1) {
    data.sheetOrder.push(sheetName)
  }
  let sheetData = constructSheetData(sheetName, cellData ? setCellData(cellData,isBussiness) : setBaseData500(isBussiness),isBussiness)
  data.sheets[sheetName] = sheetData
  return data
}

/**
 * 设置sheet数据
 * @param data 当前workbook的数据
 * @param tableName 需要添加的sheetName
 */
export function constructSheetData(tableName, cellData,isBussiness) {
  let sheetData = {
    "id": tableName,
    "name": tableName,
    "tabColor": "",
    "hidden": 0,
    "rowCount": 500,
    "columnCount": isBussiness ? 9 : 8,
    "zoomRatio": 1,
    "freeze": {
      "startRow": 1,
      "startColumn": -1,
      "ySplit": 1,
      "xSplit": 1
    },
    "scrollTop": 0,
    "scrollLeft": 0,
    "defaultColumnWidth": 100,
    "defaultRowHeight": 23,
    "mergeData": [],
    cellData: cellData,
    "rowData": {
      "0": {
        "h": 35,
        "ah": 24,
        "ia": 0
      },
    },
    "columnData": isBussiness ?
      {
      "0": {
        "w": 200,
        "hd": 0
      },
      "1": {
        "w": 125,
        "hd": 0
      },
      "2": {
        "w": 125,
        "hd": 0
      },
      "3": {
        "w": 125,
        "hd": 0
      },
      "4": {
        "w": 125,
        "hd": 0
      },
      "5": {
        "w": 125,
        "hd": 0
      },
      "6": {
        "w": 125,
        "hd": 0
      },
      "7": {
        "w": 125,
        "hd": 0
      },
      "8": {
        "w": 200,
        "hd": 0
      }
    } :
      {
      "0": {
        "w": 200,
        "hd": 0
      },
      "1": {
        "w": 125,
        "hd": 0
      },
      "2": {
        "w": 125,
        "hd": 0
      },
      "3": {
        "w": 125,
        "hd": 0
      },
      "4": {
        "w": 125,
        "hd": 0
      },
      "5": {
        "w": 125,
        "hd": 0
      },
      "6": {
        "w": 125,
        "hd": 0
      },
      "7": {
        "w": 200,
        "hd": 0
      }
    },
    "showGridlines": 1,
    "rowHeader": {
      "width": 46,
      "hidden": 0
    },
    "columnHeader": {
      "height": 20,
      "hidden": 0
    },
    "selections": [
      "A1"
    ],
    "rightToLeft": 0,
    "defaultStyle": {}
  }
  return JSON.parse(JSON.stringify(sheetData))
}

export function getHeaderCellData(isBussiness) {
  return isBussiness ?
    {
      0: {
        0: {
          v: '字段英文名称',
          s: 'HmnANE'
        },
        1: {
          v: '*字段中文名称',
          s: 'HmnANW',
          p: setBaseBody('*字段中文名称', 0, 1, '#FF0000', 'Microsoft YaHei', 12, 1)
        },
        2: {
          v: '数据类型',
          s: 'HmnANE'
        },
        3: {
          v: '默认值',
          s: 'HmnANW'
        },
        4: {
          v: '数据字典编码',
          s: 'HmnANE'
        },
        5: {
          v: '*是否非空',
          s: 'HmnANW',
          p: setBaseBody('*字段中文名称', 0, 1, '#FF0000', 'Microsoft YaHei', 12, 1)
        },
        6: {
          v: '是否主键',
          s: 'HmnANW'
        },
        7: {
          v: '是否业务主键',
          s: 'HmnANW',
        },
        8: {
          v: '备注',
          s: 'HmnANW',
        }
      }
    } :
    {
      0: {
        0: {
          v: '字段英文名称',
          s: 'HmnANE'
        },
        1: {
          v: '*字段中文名称',
          s: 'HmnANW',
          p: setBaseBody('*字段中文名称', 0, 1, '#FF0000', 'Microsoft YaHei', 12, 1)
        },
        2: {
          v: '数据类型',
          s: 'HmnANE'
        },
        3: {
          v: '默认值',
          s: 'HmnANW'
        },
        4: {
          v: '数据字典编码',
          s: 'HmnANE'
        },
        5: {
          v: '*是否非空',
          s: 'HmnANW',
          p: setBaseBody('*字段中文名称', 0, 1, '#FF0000', 'Microsoft YaHei', 12, 1)
        },
        6: {
          v: '是否主键',
          s: 'HmnANW'
        },
        7: {
          v: '备注',
          s: 'HmnANW',
        }
      }
    };
}
//设置500行默认数据
export function setBaseData500(isBussiness) {
  let cellData = getHeaderCellData(isBussiness);
  let data = isBussiness ? baseCellData : baseCellDataNoBussiness;
  for (let i = 1; i < 501; i++) {
    cellData[i] = JSON.parse(JSON.stringify(data));
  }
  return cellData
}

const baseCellData = {
  0: {
    v: '',
    s: 'dlO58m'
  },
  1: {
    v: '',
    s: 'dlO58m'
  },
  2: {
    v: '',
    s: 'dlO58m'
  },
  3: {
    v: '',
    s: 'dlO58m'
  },
  4: {
    v: '',
    s: 'dlO58m'
  },
  5: {
    v: 'N',
    s: 'dlO58m'
  },
  6: {
    v: 'N',
    s: 'dlO58m'
  },
  7: {
    v: 'N',
    s: 'dlO58m'
  },
  8: {
    v: '',
    s: 'dlO58m'
  }
}

const baseCellDataNoBussiness = {
  0: {
    v: '',
    s: 'dlO58m'
  },
  1: {
    v: '',
    s: 'dlO58m'
  },
  2: {
    v: '',
    s: 'dlO58m'
  },
  3: {
    v: '',
    s: 'dlO58m'
  },
  4: {
    v: '',
    s: 'dlO58m'
  },
  5: {
    v: 'N',
    s: 'dlO58m'
  },
  6: {
    v: 'N',
    s: 'dlO58m'
  },
  7: {
    v: '',
    s: 'dlO58m'
  }
}

/**
 * 设置单元格样式
 * @param fieldName 内容
 * @param startIndex 开始位置
 * @param endIndex 结束位置
 * @param color 颜色
 * @param fonts 字体
 * @param fontSize 字体大小
 * @param fontWeight 字体粗细
 * @returns {{drawings: {}, id: string, body: {dataStream: string, textRuns: [{st, ed, ts: {ff, st: {s: number}, ul: {s: number}, cl: {rgb}, bl, fs, ol: {s: number}}},{st: *, ts: {ff, st: {s: number}, ul: {s: number}, bl, fs, ol: {s: number}}, ed}], paragraphs: [{startIndex: *}]}, drawingsOrder: *[]}}
 */
export function setBaseBody(fieldName, startIndex, endIndex, color, fonts, fontSize, fontWeight) {
  let p = {
    "id": "__INTERNAL_EDITOR__DOCS_NORMAL",
    "drawings": {},
    "drawingsOrder": [],
    body: {
      dataStream: fieldName + "\r\n",
      textRuns: [
        {
          st: startIndex,
          ed: endIndex,
          ts: {
            ff: fonts,
            fs: fontSize,
            bl: fontWeight,
            ul: {
              s: 0
            },
            st: {
              s: 0
            },
            ol: {
              s: 0
            },
            cl: {
              rgb: color
            }
          }
        },
        {
          ts: {
            ff: fonts,
            fs: fontSize,
            bl: fontWeight,
            ul: {
              s: 0
            },
            st: {
              s: 0
            },
            ol: {
              s: 0
            }
          },
          st: startIndex + 1,
          ed: fieldName.length
        }
      ],
      paragraphs: [
        {
          startIndex: fieldName.length + 1
        }
      ]
    }
  }
  return p;
}

export function setCellData(data,isBussiness) {
  let cellData = getHeaderCellData(isBussiness);
  let num = Object.keys(data).length < 500 ? 500 : Object.keys(data).length;
  let baseCellRow = isBussiness ? baseCellData : baseCellDataNoBussiness;
  for (let i = 1; i < num + 1; i++) {
    const cellRow = data[i]
    cellData[i] = cellRow ? cellRow : JSON.parse(JSON.stringify(baseCellRow));
  }
  return cellData
}
