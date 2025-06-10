import {Disposable, ICommandService, Injector, setDependencies} from '@univerjs/core';
import {
    ComponentManager,
    ContextMenuGroup,
    ContextMenuPosition,
    IMenuManagerService,
    RibbonStartGroup
} from '@univerjs/ui';

import {CustomMenuItemSingleButtonFactory} from './menu/single-button.menu';
import {SingleButtonOperation} from '../commands/operations/single-button.operation';

import {
    CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID,
    CustomMenuItemDropdownListFirstItemFactory,
    CustomMenuItemDropdownListMainButtonFactory,
    CustomMenuItemDropdownListSecondItemFactory
} from './menu/dropdown-list.menu';
import {
    DropdownListFirstItemOperation,
    DropdownListSecondItemOperation
} from '../commands/operations/dropdown-list.operation';


export class CustomMenuController extends Disposable {
    constructor(_injector, _commandService, _menuMangerService, _componentManager) {
        super();

        this._injector = _injector;
        this._commandService = _commandService;
        this._menuMangerService = _menuMangerService;
        this._componentManager = _componentManager;

        this._initCommands();
        this._registerComponents();
        this._initMenus();
    }

    /**
     * register commands
     */
    _initCommands() {
        [
            SingleButtonOperation,
            DropdownListFirstItemOperation,
            DropdownListSecondItemOperation,
        ].forEach((c) => {
            this.disposeWithMe(this._commandService.registerCommand(c));
        });
    }

    /**
     * register icon components
     */
    _registerComponents() {
        const componentManager = this._componentManager;
        // this.disposeWithMe(componentManager.register("ButtonIcon", ButtonIcon));
        // 由于只使用的vue2和js，univer内部解析图标需要react，所以就不注册图标了
    }

    /**
     * register menu items
     */
    _initMenus() {
        this._menuMangerService.mergeMenu({
            [RibbonStartGroup.OTHERS]: {
                [SingleButtonOperation.id]: {
                    order: 10,
                    menuItemFactory: CustomMenuItemSingleButtonFactory
                },
                [CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID]: {
                    order: 11,
                    menuItemFactory: CustomMenuItemDropdownListMainButtonFactory,
                    [DropdownListFirstItemOperation.id]: {
                        order: 0,
                        menuItemFactory: CustomMenuItemDropdownListFirstItemFactory
                    },
                    [DropdownListSecondItemOperation.id]: {
                        order: 1,
                        menuItemFactory: CustomMenuItemDropdownListSecondItemFactory
                    }
                }
            },
            [ContextMenuPosition.MAIN_AREA]: {
                [ContextMenuGroup.OTHERS]: {
                    [SingleButtonOperation.id]: {
                        order: 12,
                        menuItemFactory: CustomMenuItemSingleButtonFactory
                    },
                    [CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID]: {
                        order: 9,
                        menuItemFactory: CustomMenuItemDropdownListMainButtonFactory,
                        [DropdownListFirstItemOperation.id]: {
                            order: 0,
                            menuItemFactory: CustomMenuItemDropdownListFirstItemFactory
                        },
                        [DropdownListSecondItemOperation.id]: {
                            order: 1,
                            menuItemFactory: CustomMenuItemDropdownListSecondItemFactory
                        }
                    }
                }
            }
        });
    }
}

// 为控制器类设置依赖
setDependencies(CustomMenuController, [Injector, ICommandService, IMenuManagerService, ComponentManager]);