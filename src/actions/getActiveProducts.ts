import { ProductWithPrice, Song } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getActiveProducts = async (): Promise<ProductWithPrice[]> => {
    const supabase = createServerComponentClient({ cookies: cookies });

    const { data, error } = await supabase
        .from("products")
        .select("*, prices(*)");
    // .eq("prices.active", true)
    // .order("metadata->index")
    // .eq("unit_amount", { foreignTable: "prices" });
    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getActiveProducts;
