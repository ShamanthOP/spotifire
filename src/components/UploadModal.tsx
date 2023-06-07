"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const uploadModal = useUploadModal();

    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            author: "",
            song: null,
            image: null,
        },
    });

    const onChange = (open: boolean) => {
        if (!open) {
            uploadModal.onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!user || !imageFile || !songFile) {
                setIsLoading(false);
                toast.error("Missing fields");
                return;
            }

            const id = uniqid();
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from("songs")
                    .upload(`song-${values.title}-${id}`, songFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });

            if (songError) {
                setIsLoading(false);
                toast.error("Failed uploading song");
                return;
            }

            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from("images")
                    .upload(`image-${values.title}-${id}`, imageFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });

            if (imageError) {
                setIsLoading(false);
                toast.error("Failed uploading image");
                return;
            }

            const { error: supabaseError } = await supabaseClient
                .from("songs")
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                toast.error(supabaseError.message);
                return;
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song created!");
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong :(");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", { required: true })}
                    placeholder="Song author"
                />
                <div>
                    <div className="pb-1">Select a song file</div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register("song", { required: true })}
                    />
                </div>
                <div>
                    <div className="pb-1">Select an image</div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register("image", { required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;
