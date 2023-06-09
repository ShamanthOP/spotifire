import SideBar from "@/components/Sidebar";
import "./globals.css";
import { Nunito } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToastProvider";
import getSongsById from "@/actions/getSongsById";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
    title: "Spotifire",
    description: "Everything music",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const songs = await getSongsById();

    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <SideBar songs={songs}>{children}</SideBar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
