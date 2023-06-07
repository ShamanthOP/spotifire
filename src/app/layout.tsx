import SideBar from "@/components/Sidebar";
import "./globals.css";
import { Nunito } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
    title: "Spotifire",
    description: "Everything music",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <SideBar>{children}</SideBar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
