import { ROLES } from "./role";
import {
  TITLE_ITEMS,
  MENU_ITEMS,
  MENU_IDS,
  SUBMENU_ITEMS,
  SUBMENU_IDS,
} from "./menuItems";

export const SidebarMenus = {
  [ROLES.ADMIN]: {
    title: TITLE_ITEMS.ADMIN,
    menus: [
      { id: MENU_IDS.STATS, name: MENU_ITEMS[MENU_IDS.STATS] },
      {
        id: MENU_IDS.USER_MANAGEMENT,
        name: MENU_ITEMS[MENU_IDS.USER_MANAGEMENT],
      },
    ],
  },
  [ROLES.USER]: {
    title: TITLE_ITEMS.USER,
    menus: [
      {
        id: MENU_IDS.CREATED_CLASSES,
        name: MENU_ITEMS[MENU_IDS.CREATED_CLASSES],
        subMenu: [
          { id: SUBMENU_IDS.MEMBERS, name: SUBMENU_ITEMS[SUBMENU_IDS.MEMBERS] },
          { id: SUBMENU_IDS.UNITS, name: SUBMENU_ITEMS[SUBMENU_IDS.UNITS] },
        ],
      },
      {
        id: MENU_IDS.JOINED_CLASSES,
        name: MENU_ITEMS[MENU_IDS.JOINED_CLASSES],
      },
    ],
  },
};
