import { Subscription, UserDetails } from "@/types/types";
import { User } from "@supabase/auth-helpers-nextjs";
import {
    useSessionContext,
    useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

interface Props {
    [propsName: string]: any;
}

export const UserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isUserLoading,
        supabaseClient: supabase,
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from("users").select("*").single();
    const getSubscription = () =>
        supabase
            .from("subscriptions")
            .select("*, prices(*, products(*))")
            .in("status", ["trailing", "active"])
            .single();

    useEffect(() => {
        if (user && !isDataLoading && !userDetails && !subscription) {
            setIsDataLoading(true);

            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    if (userDetailsPromise.status === "fulfilled") {
                        setUserDetails(
                            userDetailsPromise.value.data as UserDetails
                        );
                    }

                    if (subscriptionPromise.status === "fulfilled") {
                        setSubscription(
                            subscriptionPromise.value.data as Subscription
                        );
                    }

                    setIsDataLoading(false);
                }
            );
        } else if (!user && !isUserLoading && !isDataLoading) {
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isUserLoading]);

    const value = {
        accessToken,
        user,
        userDetails,
        subscription,
        isLoading: isUserLoading || isDataLoading,
    };

    return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within UserContext Provider");
    }

    return context;
};

export default useUser;
