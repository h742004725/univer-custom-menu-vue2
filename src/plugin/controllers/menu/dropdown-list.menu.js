import { MenuItemType } from '@univerjs/ui';
import { DropdownListFirstItemOperation, DropdownListSecondItemOperation } from '../../commands/operations/dropdown-list.operation';

export const CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID = 'custom-menu.operation.dropdown-list';

export function CustomMenuItemDropdownListMainButtonFactory() {
    return {
        id: CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID,
        type: MenuItemType.SUBITEMS,
        icon: '',
        tooltip: 'customMenu.dropdownList',
        title: 'customMenu.dropdown',
    };
}

export function CustomMenuItemDropdownListFirstItemFactory() {
    return {
        id: DropdownListFirstItemOperation.id,
        type: MenuItemType.BUTTON,
        title: 'customMenu.itemOne',
        icon: '',
        positions: [CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID],
    };
}

export function CustomMenuItemDropdownListSecondItemFactory() {
    return {
        id: DropdownListSecondItemOperation.id,
        type: MenuItemType.BUTTON,
        title: 'customMenu.itemTwo',
        icon: '',
        positions: [CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID],
    };
}