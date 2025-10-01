import { DashboardSidebar } from "@/components/shared/Sidebar/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className="min-h-dvh flex flex-col">

                <div className="grow-1">
                    <SidebarProvider>
                        <DashboardSidebar />
                        <SidebarTrigger />
                        {children}
                    </SidebarProvider>
                </div>

            </main>

        </>
    );
}
