import { LocaleService, Plugin, Injector, UniverInstanceType, setDependencies } from '@univerjs/core';
import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';
import { CustomMenuController } from './controllers/custom-menu.controller';

const SHEET_CUSTOM_MENU_PLUGIN = 'SHEET_CUSTOM_MENU_PLUGIN';

export class UniverSheetsCustomMenuPlugin extends Plugin {
    static type = UniverInstanceType.UNIVER_SHEET;
    static pluginName = SHEET_CUSTOM_MENU_PLUGIN;

    constructor(_injector, _localeService) {
        super();
        this._injector = _injector;
        this._localeService = _localeService;

        console.log('Custom Menu Plugin');
        this._localeService.load({
            zhCN,
            enUS
        });
    }

    onStarting() {
        // 使用 setDependencies 方式注册依赖
        setDependencies(UniverSheetsCustomMenuPlugin, [Injector, LocaleService]);

        [[CustomMenuController]].forEach((d) => this._injector.add(d));
    }

    onReady() {
        this._injector.get(CustomMenuController);
    }
}

// 为插件类设置依赖
setDependencies(UniverSheetsCustomMenuPlugin, [Injector, LocaleService]);