import { Song } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitleOrAuthor = async (query: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({ cookies: cookies });

    if (!query) {
        const allSongs = getSongs();
        return allSongs;
    }

    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .or(`title.ilike.%${query}%, author.ilike.%${query}%`)
        .order("created_at", { ascending: false });
    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongsByTitleOrAuthor;
