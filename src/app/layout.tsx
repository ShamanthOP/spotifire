import SideBar from "@/components/Sidebar";
import "./globals.css";
import { Nunito } from "next/font/google";

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
                <SideBar>{children}</SideBar>
            </body>
        </html>
    );
}
