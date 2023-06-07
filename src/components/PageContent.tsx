"use client";

import { Song } from "@/types/types";
import React from "react";
import SongItem from "./SongItem";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
    if (songs.length == 0) {
        return (
            <div className="mt-4 text-neutral-400">No Songs available :(</div>
        );
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
            {songs.map((song) => {
                return (
                    <SongItem key={song.id} song={song} onClick={() => {}} />
                );
            })}
        </div>
    );
};

export default PageContent;
