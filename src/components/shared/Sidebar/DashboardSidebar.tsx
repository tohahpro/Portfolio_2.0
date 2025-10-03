"use client"
import { Home, UserRound, SquareChartGantt, LogOut } from "lucide-react"
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BiAddToQueue } from "react-icons/bi";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserRound,
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: SquareChartGantt,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: MdOutlineDashboardCustomize,
  },
  {
    title: "Create Blog",
    url: "/dashboard/create-blog",
    icon: HiOutlinePencilSquare,
  },
  {
    title: "Add Project",
    url: "/dashboard/add-project",
    icon: BiAddToQueue,
  },

]

export function DashboardSidebar() {

  const session = useSession()
  const pathname = usePathname();


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="min-h-[94%] flex flex-col">
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent className="grow-1">
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all ${isActive
                            ? "font-semibold bg-muted-foreground/30"
                            : ""
                          }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex justify-center">
          {
            session.status === 'authenticated'
            &&
            <Button
              onClick={() => signOut()}
              variant="destructive"
              className="w-10/12 gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          }

        </div>
      </SidebarContent>
    </Sidebar>
  )
}