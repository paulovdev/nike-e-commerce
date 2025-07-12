export const opacityAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05,
    },
  },
  animateCustom: (custom) => ({
    opacity: 1,
    transition: {
      duration: custom,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  }),
  exitCustom: (custom) => ({
    opacity: 0,
    transition: {
      duration: custom,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export const textSlideAnimation = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: i,
    },
  }),
  exit: (i) => ({
    y: "100%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: i,
    },
  }),
};

export const clipAnimation = {
  initial: { clipPath: "inset( 0% 0% 100% 0%)" },
  animate: (custom) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
  exit: {
    clipPath: "inset( 0% 0% 100% 0%)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

//MENUS & MODALS
export const megaMenuAnimation = {
  overlayOpen: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  overlayClosed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuOpen: {
    height: "40vh",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuClosed: {
    height: "0vh",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const menuAnimation = {
  overlayOpen: {
    opacity: 1,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  overlayClosed: {
    opacity: 0,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuOpen: {
    right: "0%",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuClosed: {
    right: "100%",
    transition: {
      duration: 0.75,
      delay: 0.5,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const cartAnimation = {
  overlayOpen: {
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  overlayClosed: {
    opacity: 0,
    transition: {
      duration: 0.75,
      delay: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  cartOpen: {
    left: "0",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  cartClosed: {
    left: "100%",
    transition: {
      duration: 0.75,
      delay: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const filterAnimation = {
  overlayOpen: {
    opacity: 1,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  overlayClosed: {
    opacity: 0,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuOpen: {
    right: "0%",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuClosed: {
    right: "100%",
    transition: {
      duration: 0.75,
      delay: 0.5,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
