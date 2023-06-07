"use client";

import AuthModal from "@/components/AuthModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    //Make sure the modal only gets rendered in Client side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
        </>
    );
};

export default ModalProvider;
