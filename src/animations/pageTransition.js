export const pageVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.97,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};
