import { CommandType } from '@univerjs/core';

export const DropdownListFirstItemOperation = {
    id: 'custom-menu.operation.dropdown-list-first-item',
    type: CommandType.OPERATION,
    handler: async (accessor) => {
        alert('Dropdown list first item operation');
        return true;
    },
};

export const DropdownListSecondItemOperation = {
    id: 'custom-menu.operation.dropdown-list-second-item',
    type: CommandType.OPERATION,
    handler: async (accessor) => {
        alert('Dropdown list second item operation');
        return true;
    },
};