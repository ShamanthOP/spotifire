import Box from "@/components/Box";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
    return (
        <Box className="h-full flex items-center justify-center">
            <ScaleLoader color="#22c55e" height={40} width={6} loading />
        </Box>
    );
}
