"use client";

import { Price, ProductWithPrice } from "@/types/types";
import Modal from "./Modal";
import React, { useState } from "react";
import Button from "./Button";
import useUser from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: price.currency,
        minimumFractionDigits: 0,
    }).format((price.unit_amount || 0) / 100);

    return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
    const { isLoading, user, subscription } = useUser();
    const subscribeModal = useSubscribeModal();
    const [priceIDLoading, setPriceIDLoading] = useState<string>();

    const handleCheckout = async (price: Price) => {
        setPriceIDLoading(price.id);

        if (!user) {
            setPriceIDLoading(undefined);
            toast.error("Must be logged in!");
            return;
        }

        if (subscription) {
            setPriceIDLoading(undefined);
            toast.error("Already subscribed!");
            return;
        }

        try {
            const { sessionId } = await postData({
                url: "/api/create-checkout-session",
                data: { price },
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setPriceIDLoading(undefined);
        }
    };

    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModal.onClose();
        }
    };

    let content = <div className="text-center">No products available :(</div>;

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}> No prices available.</div>
                        );
                    }

                    return product.prices.map((price) => (
                        <Button
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIDLoading}
                            className="mb-4"
                        >{`Subscribe for ${formatPrice(price)} a ${
                            price.interval
                        }`}</Button>
                    ));
                })}
            </div>
        );
    }

    if (subscription) {
        content = <div className="text-center">Already subscribed!</div>;
    }

    return (
        <Modal
            title="Spotifire Premium"
            description="Listen to music with Spotifire Premium"
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    );
};

export default SubscribeModal;
