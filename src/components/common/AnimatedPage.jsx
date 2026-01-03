import React from 'react';
import { motion } from 'framer-motion';

// Premium page transition variants
const pageVariants = {
    initial: { 
        opacity: 0, 
        y: 30,
        scale: 0.98,
        filter: 'blur(10px)'
    },
    animate: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
    },
    exit: { 
        opacity: 0, 
        y: -20,
        scale: 0.98,
        filter: 'blur(8px)'
    },
};

// Premium spring configuration
const premiumTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 0.8,
};

// Alternative transitions for different effects
const transitionPresets = {
    default: premiumTransition,
    smooth: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom easeOutExpo
    },
    elastic: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
    },
    silk: {
        duration: 0.8,
        ease: [0.4, 0, 0, 1],
    }
};

const AnimatedPage = ({ 
    children, 
    className = '', 
    variant = 'default',
    delay = 0 
}) => {
    const transition = {
        ...transitionPresets[variant] || transitionPresets.default,
        delay
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className={`animated-page ${className}`}
            style={{ 
                width: '100%',
                willChange: 'transform, opacity, filter'
            }}
        >
            {children}
        </motion.div>
    );
};

// Premium staggered container for child animations
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.08 }) => {
    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1,
            }
        },
        exit: {
            transition: {
                staggerChildren: 0.03,
                staggerDirection: -1,
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Premium staggered item
export const StaggerItem = ({ children, className = '' }) => {
    const itemVariants = {
        initial: { 
            opacity: 0, 
            y: 20,
            scale: 0.95
        },
        animate: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        },
        exit: { 
            opacity: 0, 
            y: -10,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Premium reveal animation for sections
export const RevealSection = ({ children, className = '', direction = 'up' }) => {
    const directions = {
        up: { y: 60 },
        down: { y: -60 },
        left: { x: 60 },
        right: { x: -60 }
    };

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                ...directions[direction],
                filter: 'blur(10px)'
            }}
            whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0,
                filter: 'blur(0px)'
            }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
