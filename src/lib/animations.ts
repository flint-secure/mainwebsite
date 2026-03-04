import { Variants } from "framer-motion";

export const fadeUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
};