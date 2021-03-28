import { createAction } from 'deox';

export const toggleDrawerOpen = createAction('[Config] Toggle Drawer', (resolve) => () => resolve());

export type ConfigActions = ReturnType<typeof toggleDrawerOpen>;
