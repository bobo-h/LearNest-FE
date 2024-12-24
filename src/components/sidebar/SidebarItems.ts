import { useClasses } from "../../hooks/useClasses";

export interface SidebarItem {
  id: string;
  name: string;
  useQuery?: () => { data: any[] | undefined; isLoading: boolean; error: any };
}

export const SidebarItems: Record<"user" | "admin", SidebarItem[]> = {
  user: [
    {
      id: "created_classes",
      name: "생성한 클래스",
      useQuery: () => {
        const { data, isLoading, error } = useClasses();
        return {
          data: data?.created_classes || [],
          isLoading,
          error,
        };
      },
    },
    {
      id: "joined_classes",
      name: "참가한 클래스",
      useQuery: () => {
        const { data, isLoading, error } = useClasses();
        return {
          data: data?.joined_classes || [],
          isLoading,
          error,
        };
      },
    },
  ],
  admin: [
    {
      id: "stats",
      name: "통계",
      useQuery: () => {
        // 관리자 통계 데이터에 대한 React Query 훅 호출
        return { data: [], isLoading: false, error: null };
      },
    },
    {
      id: "user_management",
      name: "유저 관리",
      useQuery: () => {
        // 관리자 유저 관리 데이터에 대한 React Query 훅 호출
        return { data: [], isLoading: false, error: null };
      },
    },
  ],
};
