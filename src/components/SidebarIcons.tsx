export const IconRocket = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 8 8 8 12C8 15.31 10.04 18.07 12 19.64C13.96 18.07 16 15.31 16 12C16 8 12 2 12 2Z" fill="#FF6B9D" />
    <circle cx="12" cy="12" r="3" fill="#FFB6D9" />
    <path d="M10 18L9 23L12 21L15 23L14 18" fill="#FF6B9D" />
  </svg>
);

export const IconBell = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#87CEEB" opacity="0.8" />
    <path d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" fill="#87CEEB" />
  </svg>
);

export const IconStar = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26H21.77L16.84 12.74L19.93 18.26L12 14.52L4.07 18.26L7.16 12.74L2.23 8.26H8.91L12 2Z" fill="#FF1493" />
  </svg>
);

export const IconCalendar = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="18" rx="2" fill="#FFD700" opacity="0.9" />
    <rect x="2" y="4" width="20" height="4" rx="2" fill="#FFA500" />
    <line x1="8" y1="2" x2="8" y2="8" stroke="#FFD700" strokeWidth="2" />
    <line x1="16" y1="2" x2="16" y2="8" stroke="#FFD700" strokeWidth="2" />
  </svg>
);

export const IconCart = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 4V3C7 2.45 7.45 2 8 2H20C20.55 2 21 2.45 21 3V4" stroke="#00CED1" strokeWidth="2" fill="none" />
    <path d="M5 6H21L18 18C18 18.55 17.55 19 17 19H9C8.45 19 8 18.55 8 18L5 6Z" fill="#00CED1" />
    <circle cx="10" cy="20" r="1.5" fill="#00CED1" />
    <circle cx="16" cy="20" r="1.5" fill="#00CED1" />
  </svg>
);

export const IconCode = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3L2 9L8 15M16 3L22 9L16 15" stroke="#FF69B4" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M16 3L8 21" stroke="#FF69B4" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const IconUser = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="#4169E1" />
    <path d="M2 20C2 15.58 6.48 12 12 12C17.52 12 22 15.58 22 20" fill="#4169E1" />
  </svg>
);
