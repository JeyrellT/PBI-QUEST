import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from './pageTransitionsConfig';
import './PageTransitions.css';

/**
 * Transiciones de página premium y fluidas
 */

/**
 * Componente de transición de página
 */
export const PageTransition = ({ 
  children, 
  variant = 'premium',
  transition = 'premium',
  className = ''
}) => {
  const variants = pageVariants[variant] || pageVariants.premium;
  const trans = pageTransition[transition] || pageTransition.premium;

  return (
    <motion.div
      className={`page-transition ${className}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={trans}
    >
      {children}
    </motion.div>
  );
};

/**
 * Transición para secciones individuales
 */
export const SectionTransition = ({ 
  children, 
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      className={`section-transition ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Transición staggered para listas
 */
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => {
  return (
    <motion.div
      className={`stagger-container ${className}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay
          }
        },
        exit: {
          transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`stagger-item ${className}`}
      variants={{
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: 'spring',
            damping: 20,
            stiffness: 300
          }
        },
        exit: { 
          opacity: 0, 
          y: -20, 
          scale: 0.95,
          transition: {
            duration: 0.2
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Transición de modal premium
 */
export const ModalTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`modal-transition ${className}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Backdrop para modales con blur
 */
export const ModalBackdrop = ({ onClick, className = '' }) => {
  return (
    <motion.div
      className={`modal-backdrop ${className}`}
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    />
  );
};

/**
 * Transición para tabs
 */
export const TabTransition = ({ children, direction = 'left', className = '' }) => {
  const isLeft = direction === 'left';
  
  return (
    <motion.div
      className={`tab-transition ${className}`}
      initial={{ 
        x: isLeft ? -20 : 20, 
        opacity: 0 
      }}
      animate={{ 
        x: 0, 
        opacity: 1 
      }}
      exit={{ 
        x: isLeft ? 20 : -20, 
        opacity: 0 
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Reveal animation (aparece al hacer scroll)
 */
export const RevealOnScroll = ({ 
  children, 
  threshold = 0.1,
  className = '' 
}) => {
  return (
    <motion.div
      className={`reveal-scroll ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Slide reveal lateral
 */
export const SlideReveal = ({ 
  children, 
  direction = 'left', // 'left' | 'right'
  className = '' 
}) => {
  return (
    <motion.div
      className={`slide-reveal ${className}`}
      initial={{ 
        x: direction === 'left' ? -100 : 100, 
        opacity: 0 
      }}
      whileInView={{ 
        x: 0, 
        opacity: 1 
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Fade in simple
 */
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = '' 
}) => {
  return (
    <motion.div
      className={`fade-in ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Scale in animation
 */
export const ScaleIn = ({ 
  children, 
  delay = 0,
  className = '' 
}) => {
  return (
    <motion.div
      className={`scale-in ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Bounce in animation
 */
export const BounceIn = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`bounce-in ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        damping: 10,
        stiffness: 200
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
