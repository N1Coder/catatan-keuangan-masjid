import { useMediaQuery } from "@vueuse/core"

const mediaQuery = {
  isMobileScreen: useMediaQuery("(max-width: 640px)"),
  isTabletScreen: useMediaQuery("(min-width: 768px)"),
  isDekstopScreen: useMediaQuery("(min-width: 1280px)"),
}

export const { isMobileScreen, isTabletScreen, isDekstopScreen } = mediaQuery
