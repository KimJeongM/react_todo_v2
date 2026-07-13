
import {  motion } from "framer-motion";
function Alert({children, onClose}){
    return (
        <motion.div 
            className="alert-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.45 }  }}
        >
            <motion.div 
                className="alert-box"
                initial={{x:'-50%', y:'-30%', opacity:0}}
                animate={{x:'-50%', y:'-50%', opacity:1}}
                exit={{x:'-50%', y:'-30%', opacity:0}}
                transition={{ duration: 0.45, ease: [0.85, 0, 0.15, 1] }}
            >
                {children}
            </motion.div>
            <span className="dimmed" onClick={onClose}></span>
        </motion.div>
    );
}

export default Alert; 