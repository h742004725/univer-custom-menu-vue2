<template>
  <div ref="container" class="univer-container"></div>
</template>

<script>
import { LocaleType, merge, Univer, UniverInstanceType } from "@univerjs/core";
// import { FUniver } from "@univerjs/core/facade";
import { defaultTheme } from "@univerjs/design";

import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverUIPlugin } from "@univerjs/ui";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsFormulaUIPlugin } from "@univerjs/sheets-formula-ui";
import { UniverSheetsNumfmtPlugin } from "@univerjs/sheets-numfmt";
import { UniverSheetsNumfmtUIPlugin } from "@univerjs/sheets-numfmt-ui";

import DesignZhCN from '@univerjs/design/locale/zh-CN';
import UIZhCN from '@univerjs/ui/locale/zh-CN';
import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN';
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN';
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN';
import SheetsFormulaUIZhCN from '@univerjs/sheets-formula-ui/locale/zh-CN';
import SheetsNumfmtUIZhCN from '@univerjs/sheets-numfmt-ui/locale/zh-CN';

// 这里的 Facade API 是可选的，你可以根据自己的需求来决定是否引入
import '@univerjs/engine-formula/facade';
import '@univerjs/ui/facade';
import '@univerjs/docs-ui/facade';
import '@univerjs/sheets/facade';
import '@univerjs/sheets-ui/facade';
import '@univerjs/sheets-formula/facade';
import '@univerjs/sheets-numfmt/facade';

import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/docs-ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula-ui/lib/index.css";
import "@univerjs/sheets-numfmt-ui/lib/index.css";
import {UniverSheetsCustomMenuPlugin} from "@/plugin";
import {DEFAULT_WORKBOOK_DATA} from "@/assets/default-workbook-data";
// import {FUniver} from "@univerjs/core/facade";


export default {
  name: 'UniverSheet',
  data() {
    return {
    };
  },
  mounted() {
    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: merge(
            {},
            DesignZhCN,
            UIZhCN,
            DocsUIZhCN,
            SheetsZhCN,
            SheetsUIZhCN,
            SheetsFormulaUIZhCN,
            SheetsNumfmtUIZhCN
        ),
      },
    });

    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);

    univer.registerPlugin(UniverUIPlugin, {
      container: this.$refs.container,
    });

    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    univer.registerPlugin(UniverSheetsFormulaUIPlugin);
    univer.registerPlugin(UniverSheetsNumfmtPlugin);
    univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
    univer.registerPlugin(UniverSheetsCustomMenuPlugin);

    univer.createUnit(UniverInstanceType.UNIVER_SHEET, DEFAULT_WORKBOOK_DATA);

    // const univerAPI = FUniver.newAPI(univer);

  },
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