"use client";

import { Song } from "@/types/types";
import React, { useEffect, useMemo, useState } from "react";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";
import IntervalTimer from "@/utils/intervalTimer";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume == 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length == 0) {
            return;
        }

        const currentPlayingSongIndex = player.ids.findIndex(
            (id) => id === player.activeId
        );
        const nextSongIndex =
            currentPlayingSongIndex + 1 === player.ids.length
                ? 0
                : currentPlayingSongIndex + 1;
        player.setId(player.ids[nextSongIndex]);
    };

    const onPlayPrevious = () => {
        if (player.ids.length == 0) {
            return;
        }

        const currentPlayingSongIndex = player.ids.findIndex(
            (id) => id === player.activeId
        );
        const previousSongIndex =
            currentPlayingSongIndex === 0
                ? player.ids.length - 1
                : currentPlayingSongIndex - 1;
        player.setId(player.ids[previousSongIndex]);
    };

    const [play, { pause, sound }] = useSound(songUrl, {
        volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ["mp3"],
    });

    const progressTimer = useMemo(() => {
        return new IntervalTimer(() => {
            setProgress((prev) => prev + 100 / sound.duration());
        }, 1000);
    }, [sound]);

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        };
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            progressTimer.resume();
            play();
        } else {
            progressTimer.pause();
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    };

    useEffect(() => {
        if (sound?.duration) {
            progressTimer.start();
        }
    }, [sound, progressTimer]);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 h-full">
                <div className="flex w-full justify-start">
                    <div className="flex items-center gap-x-4">
                        <MediaItem song={song} />
                        <LikeButton songId={song.id} />
                    </div>
                </div>

                <div className="flex md:hidden col-auto w-full justify-end items-center">
                    <div
                        onClick={handlePlay}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                    >
                        <Icon size={30} className="text-black" />
                    </div>
                </div>

                <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                    <AiFillStepBackward
                        onClick={onPlayPrevious}
                        size={24}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    <div
                        onClick={handlePlay}
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
                    >
                        <Icon size={30} className="text-black" />
                    </div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={24}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>

                <div className="hidden md:flex w-full justify-end pr-2">
                    <div className="flex items-center gap-x-2 w-[120px]">
                        <VolumeIcon onClick={toggleMute} size={34} />
                        <Slider
                            value={volume}
                            onChange={(value) => setVolume(value)}
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-[-17px] w-[98%]">
                <Slider
                    value={progress}
                    className="bg-green-500"
                    defaultValue={0}
                    max={100}
                />
            </div>
        </>
    );
};

export default PlayerContent;
