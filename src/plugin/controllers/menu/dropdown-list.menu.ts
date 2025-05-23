import type { IMenuButtonItem, IMenuSelectorItem } from '@univerjs/ui';
import {  MenuItemType } from '@univerjs/ui';

import { DropdownListFirstItemOperation, DropdownListSecondItemOperation } from '../../commands/operations/dropdown-list.operation';

export const CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID = 'custom-menu.operation.dropdown-list';

// 扩展IMenuButtonItem接口，添加positions属性
interface ICustomMenuButtonItem<T> extends IMenuButtonItem<T> {
    positions?: string[];
}

export function CustomMenuItemDropdownListMainButtonFactory(): IMenuSelectorItem<string> {
    return {
        // When type is MenuItemType.SUBITEMS, this factory serves as a container for the drop-down list, and you can set any unique id
        id: CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID,
        // The type of the menu item, in this case, it is a subitems
        type: MenuItemType.SUBITEMS,
        icon: '',
        tooltip: 'customMenu.dropdownList',
        title: 'customMenu.dropdown',
    };
}

export function CustomMenuItemDropdownListFirstItemFactory(): ICustomMenuButtonItem<string> {
    return {
        id: DropdownListFirstItemOperation.id,
        type: MenuItemType.BUTTON,
        title: 'customMenu.itemOne',
        icon: '',
        positions: [CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID],
    };
}

export function CustomMenuItemDropdownListSecondItemFactory(): ICustomMenuButtonItem<string> {
    return {
        id: DropdownListSecondItemOperation.id,
        type: MenuItemType.BUTTON,
        title: 'customMenu.itemTwo',
        icon: '',
        positions: [CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID],
    };
}
