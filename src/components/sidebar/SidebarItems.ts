export interface SidebarSubMenu {
  id: string;
  name: string;
}

export interface SidebarItem {
  id: string;
  name: string;
  subMenu?: SidebarSubMenu[];
}

export const SidebarItems: Record<"user" | "admin", SidebarItem[]> = {
  user: [
    {
      id: "created_classes",
      name: "생성한 클래스",
      subMenu: [
        { id: "members", name: "멤버 관리" },
        { id: "units", name: "클래스 관리" },
      ],
    },
    { id: "joined_classes", name: "참가한 클래스" },
  ],
  admin: [
    { id: "stats", name: "통계" },
    { id: "user_management", name: "유저 관리" },
  ],
};
