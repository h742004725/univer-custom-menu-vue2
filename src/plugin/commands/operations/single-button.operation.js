import { CommandType } from '@univerjs/core';

export const SingleButtonOperation = {
    id: 'custom-menu.operation.single-button',
    type: CommandType.OPERATION,
    handler: async (accessor) => {
        alert('Single button operation');
        return true;
    },
};