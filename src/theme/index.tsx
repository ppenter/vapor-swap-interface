import React, { useMemo } from 'react'
import { Text, TextProps } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Colors } from './styled'

export * from './components'

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',

    // backgrounds / greys
    bg01: 'black',
    bg0: darkMode ? '#161616' : 'rgba(16, 16, 18, 0.9)',
    bg1: darkMode ? '#1C1C1C' : 'rgba(16, 16, 18, 0.9)',
    bg2: darkMode ? '#191B1F' : '#EDEEF2',
    bg3: darkMode ? '#40444F' : '#CED0D9',
    bg4: darkMode ? '#565A69' : '#888D9B',
    bg5: darkMode ? '#6C7284' : '#888D9B',
    bg6: darkMode ? '#1A2028' : '#6C7284',

    //specialty colors
    modalBG: darkMode ? '#1C1C1C' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#822FD3' : '#ff8300',
    primary2: darkMode ? '#822FD3' : '#ff8300',
    primary3: darkMode ? '#822FD3' : '#ff8300',
    primary4: darkMode ? '#822FD3' : '#ff8300',
    primary5: darkMode ? '#822FD3' : '#ff8300',

    primary1_30: 'rgba(130, 47, 211, 0.5)',
    primaryTransparent: 'rgba(130, 47, 211, 0.2)',

    // color text
    primaryText1: darkMode ? '#9457d1' : '#ff8300',

    // secondary colors
    secondary1: darkMode ? '#9457d1' : '#ea933c',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    secondary1_30: 'rgba(12, 92, 146, 0.3)',
    secondary1_10: 'rgba(12, 92, 146, 0.1)',

    dark0: 'rgba(12, 6, 0, 0.9)',
    dark1: 'rgba(22, 11, 0,0.9)',
    //dark2: 'rgba(38, 19, 0, 0.9)',
    dark2: 'rgba(48, 24, 0, 0.9)',
    dark3: 'rgba(38, 20, 2, 1)',
    dark4: 'rgba(45, 25, 5,1)',
    dark5: 'transparent',
    darkTransparent: 'rgba(12, 6, 0, 0.12)',
    darkTransparent2: 'rgba(12, 6, 0, 0.32)',
    darkTransparent3: 'rgba(12, 6, 0, 0.8)',

    bgGradient: `linear-gradient(90deg, rgba(16, 16, 18, 0.9) 0%, rgba(10,14,36, 0.9) 35%, rgba(16, 16, 18, 0.9) 100%)`,

    // other
    red1: 'rgba(242,65,65,0.3)',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#e3a507',
    yellow2: '#ff8f00',
    yellow3: '#F3B71E',
    blue1: '#2172E5',
    blue2: '#5199FF',

    error: '#FD4040',
    success: '#27AE60',
    warning: '#ff8f00',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedBackground = styled.div<{ backgroundColor?: string | undefined }>`
  position: fixed;
  /* top: 0; */
  top: 10vh;
  /* left: calc(-100vw / 2); */
  right: 0;
  pointer-events: none;
  /* max-width: 100vw !important; */
  width: 100%;
  /* width: 200vw; */
  height: 100%;
  mix-blend-mode: color;
  opacity: 0.6;
  transform: translateY(-1000vh);
  will-change: background;
  transition: background 450ms ease;
`

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Inter var', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

 a {
   color: ${colors(false).blue1}; 
   text-decoration: none;
 }

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on,  'cv01' on, 'cv03' on;
  
}

.rubic-header__logo[_ngcontent-cet-c267] img[_ngcontent-cet-c267] {
  display: none;
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg0};
}

body {
  min-height: 100vh;
  background-repeat: repeat;
  background-color: ${({ theme }) => theme.bg0};
}
`
