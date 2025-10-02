"use client"
import { Home, UserRound, SquareChartGantt, LogOut } from "lucide-react"
import { MdAddToPhotos } from "react-icons/md";
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


// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/dashboard",
    icon: UserRound,
  },
  {
    title: "Create Blog",
    url: "/dashboard/create-blog",
    icon: SquareChartGantt,
  },
  {
    title: "Add Project",
    url: "/dashboard/add-project",
    icon: MdAddToPhotos,
  },
]

export function DashboardSidebar() {

  const session = useSession()


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="min-h-[94%] flex flex-col">
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent className="grow-1">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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