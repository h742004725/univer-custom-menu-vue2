<template>
  <div ref="container" class="univer-container"></div>
</template>

<script>
import { createUniver, defaultTheme, LocaleType, merge} from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-core.css';
import { DEFAULT_TEXT_FORMAT_EXCEL } from '@univerjs/engine-numfmt';
import { UniverSheetsDataValidationPreset } from '@univerjs/presets/preset-sheets-data-validation';
import UniverPresetSheetsDataValidationZhCN from '@univerjs/presets/preset-sheets-data-validation/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
import {constructSheetData, setBaseData500, setCellData, univerInit} from './univer'
import {menuOperation} from "./menu/hiddenMenu";
import {UniverSheetsCustomMenuPlugin} from "@/plugin";
export default {
  name: 'UniverSheet1',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    data: {
      handler(val) {
        this.destroyUniver()
        this.$nextTick(() => {
          this.init(val)
        })
      },
      immediate: false
    }
  },
  data() {
    return {
      univer: null,
      workbook: null,
      univerAPI: null,
      univerData: {}
    }
  },
  mounted() {
    this.init('Univer-Test',null,true)
  },
  created() {

  },
  methods: {
    init(tableName, cellData, isBussiness) {
      let cData = cellData? setCellData(cellData,isBussiness) : setBaseData500();
      const wbData = univerInit(tableName,cData,isBussiness)
      const { univer, univerAPI } = createUniver({
        locale: LocaleType.ZH_CN,
        locales: {
          [LocaleType.ZH_CN]: merge(
            {},
            UniverPresetSheetsCoreZhCN,
            UniverPresetSheetsDataValidationZhCN
          ),
        },
        theme: defaultTheme,
        presets: [
          UniverSheetsCorePreset({
            container: this.$refs.container,
            header: false,
            toolbar: false,
            footer: true,
            contextMenu: true,
            disableAutoFocus: true,
            // override?: DependencyOverride;
            menu: menuOperation
          }),
          UniverSheetsDataValidationPreset({
            // 是否在下拉菜单中显示编辑按钮
            showEditOnDropdown: false,
          }),
        ],
        plugins:[UniverSheetsCustomMenuPlugin]
      });
      univerAPI.onCommandExecuted((command) => {
        if (command.id === 'sheet.operation.set-cell-edit-visible' && !command.params.visible) {
          debugger;
        }
      })

      const workbook = univerAPI.createWorkbook(wbData);
      const worksheet = workbook.getActiveSheet();
      const rule = univerAPI.newDataValidation()
        .requireCheckbox('Y', 'N')
        .setOptions({
          allowBlank: false,
          showErrorMessage: true,
          error: '只能选择Y或者N'
        })
        .build();
      let fRange = isBussiness ? worksheet.getRange('F2:H500') : worksheet.getRange('F2:G500');
      fRange.setDataValidation(rule);
      this.univer = univer;
      this.rule = rule;
      this.univerAPI = univerAPI;
      this.workbook = workbook;
    },
    /**
     * 设置勾选单元格样式
     * @param worksheet
     */
    setCellStyleForCheckBox(worksheet) {
      const fRange = worksheet.getRange('F2:H500');
      const rule = this.rule;
      fRange.setDataValidation(rule);
    },
    /**
     * 打开表格，如果表格不存在则创建一个新的表格
     * @param tableName
     * @param cellData
     */
    openSheet(tableName,cellData,isBussiness) {
      if (this.workbook) {
        const sheet = this.workbook.getSheetByName(tableName);
        if (sheet) {
          this.workbook.setActiveSheet(sheet);
        } else {
          this.addSheet(tableName,cellData,isBussiness);
          this.deleteTestSheet();
        }
      }else {
        this.init(tableName,cellData,isBussiness);
      }
    },
    deleteTestSheet() {
      const sheet = this.workbook.getSheetByName('Univer-Test');
      if (sheet) {
        this.workbook.deleteSheet(sheet);
      }
    },
    /**
     * 添加表格
     * @param tableName
     * @param cellData
     */
    addSheet(tableName,cellData,isBussiness) {
      let cData = cellData? setCellData(cellData,isBussiness) : setBaseData500();
      const sheetData = constructSheetData(tableName,cData,isBussiness);
      debugger
      const newSheet = this.workbook.create(tableName,Object.keys(cData).length + 1,9,{
        sheet: sheetData,
      });
      this.setCellStyleForCheckBox(newSheet);
    },
    destroyUniver() {
      if (this.univer) {
        try {
          this.univer.dispose()
        } catch (error) {
          console.error('销毁Univer实例时出错:', error)
        }
      }
      this.univer = null
      this.workbook = null
      this.univerAPI = null
    },
    exitEdit() {
      if (this.univerAPI) {
        try {
          this.univerAPI.executeCommand('sheet.operation.set-cell-edit-visible', {visible: false})
        } catch (error) {
          console.error('执行命令时出错:', error)
        }
      }
    },
    getData() {
      if (!this.univerAPI) {
        throw new Error('未初始化')
      }

      try {
        const activeWorkbook = this.univerAPI.getActiveWorkbook()
        const snapshot = activeWorkbook.save()
        const sheetData = Object.values(snapshot.sheets).find((sheet) => {
          return sheet.id === 'sheet-01'
        })
        return sheetData.cellData
      } catch (error) {
        console.error('获取数据时出错:', error)
        return {}
      }
    }
  },
  beforeDestroy() {
    this.destroyUniver()
  }
}
</script>

<!-- 组件局部样式 -->
<style scoped>
.univer-container {
  height: calc(100vh - 260px); /* 视口高度减去顶部导航及内边距 */
  width: calc(100% - 10px); /* 减去左右内边距 */
  padding-top: 16px;
  box-sizing: border-box;
}
</style>

<!-- 全局样式 - 没有scoped标记，以便应用到所有元素 -->
<style>
/* 控制左侧边栏 */
[data-u-comp="left-sidebar"] {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* 确保主画布区域占满宽度 */
[data-u-comp="render-canvas"] {
  width: 100% !important;
}

/* 控制侧边栏和其他元素 */
aside {
  padding: 0 !important;
}

/* 修复工作表高度 */
.univer-min-h-0 {
  min-height: 0 !important;
}

/* 确保主容器占满可用空间 */
[data-u-comp="workbench-layout"] {
  height: 100% !important;
}
</style>
