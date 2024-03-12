
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ThemeProvider from "@/components/layout/theme-toggle/theme-provider";
import { authOptions } from "@/lib/auth-options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Sistema de Gestão de Atendimentos - Dashboard",
  description: "Sistema de Gestão de Atendimentos - Dashboard",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <>

        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="w-full pt-16">           
              {children}           
          </main>
        </div>
   

    </>
  )

}