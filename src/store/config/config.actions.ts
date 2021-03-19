import { createAction } from 'deox';

export const setDrawerOpen = createAction('[Config] Drawer', (resolve) => (event: boolean) => resolve({ event }));
export const purgeConfig = createAction('[Config] Purge');

export type ConfigActions = ReturnType<typeof setDrawerOpen> | ReturnType<typeof purgeConfig>;
