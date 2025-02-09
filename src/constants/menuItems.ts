import { ROLES } from "./role";

export const TITLE_ITEMS = {
  [ROLES.ADMIN]: "관리자 메뉴",
  [ROLES.USER]: "나의 클래스",
};

export const MENU_IDS = {
  CREATED_CLASSES: "created_classes",
  JOINED_CLASSES: "joined_classes",
  STATS: "stats",
  USER_MANAGEMENT: "user_management",
};

export const MENU_ITEMS = {
  [MENU_IDS.CREATED_CLASSES]: "생성한 클래스",
  [MENU_IDS.JOINED_CLASSES]: "참가한 클래스",
  [MENU_IDS.STATS]: "통계",
  [MENU_IDS.USER_MANAGEMENT]: "유저 관리",
};

export const SUBMENU_IDS = {
  MEMBERS: "members",
  UNITS: "units",
  STUDY: "study",
  QNA: "qna",
  USER_STATS: "user_stats",
  ADMIN_MANAGE: "admin_manage",
};

export const SUBMENU_ITEMS = {
  [SUBMENU_IDS.MEMBERS]: "멤버 관리",
  [SUBMENU_IDS.UNITS]: "클래스 관리",
  [SUBMENU_IDS.STUDY]: "학습 하기",
  [SUBMENU_IDS.QNA]: "질문 하기",
  [SUBMENU_IDS.USER_STATS]: "유저 통계",
  [SUBMENU_IDS.ADMIN_MANAGE]: "관리자 설정",
};
