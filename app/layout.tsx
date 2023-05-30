import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Sidebar from "@/components/Sidebar";
import Login from "@/components/Login";
import SessionProvider from "@/contexts/SessionProvider";
import ClientProvider from "@/components/ClientProvider";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login></Login>
          ) : (
            <div className="flex">
              {/* Sidebar */}
              <div className="fixed h-screen w-[15rem] overflow-y-auto bg-[#202123] md:min-w-[15rem]">
                <Sidebar></Sidebar>
              </div>

              {/* ClientProvider - Notification */}
              <ClientProvider />
              <main className=" ml-[15rem] flex-grow bg-[#343531] ">
                {children}
              </main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
