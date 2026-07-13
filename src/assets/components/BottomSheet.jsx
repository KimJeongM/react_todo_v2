import {  motion } from "framer-motion";

function BottomSheet({children}){
    return(
        <motion.div
            className="bottom-sheet-container"
            initial={{y:'110%'}}
            animate={{y:0}}
            exit={{y:'110%'}}
            transition={{ duration: 0.45, ease: [0.85, 0, 0.15, 1] }}
        >
            {children}
        </motion.div>
    )
}

export default BottomSheet; 