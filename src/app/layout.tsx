import SideBar from "@/components/Sidebar";
import "./globals.css";
import { Nunito } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToastProvider";
import getSongsById from "@/actions/getSongsById";
import Player from "@/components/Player";
import getActiveProducts from "@/actions/getActiveProducts";

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
    const products = await getActiveProducts();

    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider products={products} />
                        <SideBar songs={songs}>{children}</SideBar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
