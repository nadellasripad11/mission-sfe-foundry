export const IconRocket = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rocketBody" x1="8" y1="2" x2="24" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FF9AC1" />
        <stop offset="1" stopColor="#FF5D8F" />
      </linearGradient>
      <linearGradient id="rocketWin" x1="12" y1="9" x2="20" y2="17" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#BFEFFF" />
        <stop offset="1" stopColor="#5DC7EE" />
      </linearGradient>
      <linearGradient id="rocketFlame" x1="12" y1="24" x2="16" y2="31" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FFD36E" />
        <stop offset="1" stopColor="#FF8A3D" />
      </linearGradient>
    </defs>
    <g transform="rotate(45 16 16)">
      <path d="M16 3C20 6 22 12 22 17C22 21 19.5 24.5 16 26C12.5 24.5 10 21 10 17C10 12 12 6 16 3Z" fill="url(#rocketBody)" />
      <path d="M10 17C8 17 6 19.5 6 23L10 21.5V17Z" fill="#5DC7EE" />
      <path d="M22 17C24 17 26 19.5 26 23L22 21.5V17Z" fill="#5DC7EE" />
      <circle cx="16" cy="15" r="4" fill="url(#rocketWin)" />
      <circle cx="16" cy="15" r="4" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
      <path d="M13.5 26L16 31L18.5 26C17.7 26.6 16.9 26.9 16 26.9C15.1 26.9 14.3 26.6 13.5 26Z" fill="url(#rocketFlame)" />
    </g>
  </svg>
);

export const IconBell = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bellBody" x1="8" y1="6" x2="24" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#8CD9F0" />
        <stop offset="1" stopColor="#3FA9D6" />
      </linearGradient>
    </defs>
    <path d="M16 3L17.4 6.4C21.4 7.3 24 10.6 24 14.8V19L26.5 22.5C26.9 23 26.5 23.7 25.9 23.7H6.1C5.5 23.7 5.1 23 5.5 22.5L8 19V14.8C8 10.6 10.6 7.3 14.6 6.4L16 3Z" fill="url(#bellBody)" />
    <path d="M12 24.5C12 26.4 13.8 28 16 28C18.2 28 20 26.4 20 24.5H12Z" fill="#2D8AB5" />
    <rect x="10" y="23" width="12" height="1.6" rx="0.8" fill="#FFD36E" />
    <path d="M16 1L17 3.5L14.7 3L16 1Z" fill="#FFD36E" />
  </svg>
);

export const IconRate = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rateBody" x1="8" y1="9" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FF9AD1" />
        <stop offset="1" stopColor="#E85BB0" />
      </linearGradient>
    </defs>
    <rect x="7" y="9" width="20" height="17" rx="4" fill="url(#rateBody)" />
    <rect x="10.5" y="12.5" width="13" height="10" rx="2" fill="#FFEAF6" />
    <path d="M13.5 17.3L16.3 20.1L21 14.5" stroke="#E85BB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M6 12L4.4 12.6L6 13.2L6.6 14.8L7.2 13.2L8.8 12.6L7.2 12L6.6 10.4Z" fill="#FFD36E" />
    <path d="M27 20L26 20.4L27 20.8L27.4 21.8L27.8 20.8L28.8 20.4L27.8 20L27.4 19Z" fill="#FFD36E" />
  </svg>
);

export const IconCalendar = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="7" width="22" height="20" rx="3" fill="#FFF8EE" stroke="#F0D9B5" strokeWidth="1" />
    <path d="M5 10C5 8.34 6.34 7 8 7H24C25.66 7 27 8.34 27 10V13H5V10Z" fill="#FF6FA0" />
    <rect x="9" y="4" width="2.2" height="6" rx="1.1" fill="#FF6FA0" />
    <rect x="20.8" y="4" width="2.2" height="6" rx="1.1" fill="#FF6FA0" />
    <path d="M16 16L17.1 18.5L19.8 18.8L17.8 20.7L18.3 23.4L16 22L13.7 23.4L14.2 20.7L12.2 18.8L14.9 18.5Z" fill="#FFC93C" />
  </svg>
);

export const IconCart = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cartBody" x1="6" y1="8" x2="26" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#9FF0F5" />
        <stop offset="1" stopColor="#41C9DA" />
      </linearGradient>
    </defs>
    <path d="M4 6H7L10 20H23L26 10H9" stroke="url(#cartBody)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="25" r="2" fill="#2FA9BA" />
    <circle cx="21" cy="25" r="2" fill="#2FA9BA" />
    <path d="M9 10H26" stroke="url(#cartBody)" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const IconResources = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bookBody" x1="6" y1="5" x2="24" y2="27" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FF97B6" />
        <stop offset="1" stopColor="#F35F94" />
      </linearGradient>
    </defs>
    <path d="M8 5C6.34 5 5 6.34 5 8V24C5 25.66 6.34 27 8 27H24V5H8Z" fill="url(#bookBody)" />
    <path d="M8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11H24V5H8Z" fill="#FFC2D6" />
    <rect x="9" y="14" width="10" height="1.6" rx="0.8" fill="#FFEAF2" />
    <rect x="9" y="18" width="7" height="1.6" rx="0.8" fill="#FFEAF2" />
    <path d="M22 9L27 4L29 6L24 11L21.5 11.5Z" fill="#FFD36E" />
  </svg>
);

export const IconUser = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#FFFFFF" stroke="#E4E0D6" strokeWidth="1" />
    <circle cx="16" cy="13" r="5" fill="#1B4F8C" />
    <path d="M6 26C6 20.48 10.48 17 16 17C21.52 17 26 20.48 26 26V27H6V26Z" fill="#1B4F8C" />
  </svg>
);
