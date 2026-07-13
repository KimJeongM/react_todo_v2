import { motion } from "framer-motion";

function BottomSheetWrap({children, onClose}){
    return(
        <motion.div 
            className="bottom-sheet-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.45 }  }}
        >
            <span className="dimmed" onClick={onClose}></span>
            {children}
        </motion.div>
    )
}

export default BottomSheetWrap; 