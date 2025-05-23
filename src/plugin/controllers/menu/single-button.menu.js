import { MenuItemType } from '@univerjs/ui';
import { SingleButtonOperation } from '../../commands/operations/single-button.operation';

export function CustomMenuItemSingleButtonFactory() {
    return {
        id: SingleButtonOperation.id,
        type: MenuItemType.BUTTON,
        icon: '',
        tooltip: 'customMenu.singleButton',
        title: 'customMenu.button',
    };
}