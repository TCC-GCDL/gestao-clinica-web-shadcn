
import ThemeProvider from "@/components/layout/theme-toggle/theme-provider";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }
    return (
        <>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        
        </>
    )

}