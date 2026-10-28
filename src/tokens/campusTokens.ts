/**
 * CampusLoop Design System Tokens
 * Source of truth: Reference screenshots (01_Home, 02_Explore, 03_Create_Post, 04_Inbox, 05_Profile, Design_System)
 */

export const CAMPUS_TOKENS = {
  colors: {
    canvas: '#F6F3EC',
    card: '#FFFFFF',
    text: '#111111',
    muted: '#6B7280',
    border: '#E8E4DA',
    borderLight: '#EFECE6',

    // Core Brand Accents
    primaryBlue: '#2B4EFF',
    primaryBlueHover: '#1E3EDB',
    dark: '#111111',
    darkHover: '#222222',
    lime: '#D7F75B',
    limeHover: '#C6E84A',

    // Secondary Pastel Tints
    tintBlue: '#E6EAFD',
    tintLime: '#EAF6B0',
    tintPink: '#FDE8E0',
    tintPurple: '#EDE9FE',
    tintSlate: '#F3F4F6',
    tintYellow: '#FEF9C3',

    // Dark Mode counterparts
    darkCanvas: '#0E0E10',
    darkCard: '#18181B',
    darkCardBorder: '#27272A',
    darkText: '#F4F4F5',
    darkMuted: '#9CA3AF',
  },

  radii: {
    card: '22px',
    pill: '9999px',
    input: '9999px',
    avatar: '9999px',
    tile: '20px',
  },

  heights: {
    searchField: '48px',
    filterChip: '40px',
    buttonLarge: '48px',
    buttonSmall: '40px',
    tag: '24px',
    topNav: '64px',
    bottomNav: '68px',
  },

  campusName: 'ITM SLS Baroda University',
  campusCity: 'Vadodara',
  campusLocationTag: 'ITM SLS Baroda University, Vadodara',
} as const;
