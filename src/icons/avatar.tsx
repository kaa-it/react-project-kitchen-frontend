import React from "react";

interface IAvatarProps {
  width?: string;
  height?: string;
}

const AvatarIcon: React.FC<IAvatarProps> = ({ width, height }) => {
  return (
    <svg
      width={width ? width : "24"}
      height={height ? height : "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#4C4CFF" />
      <path
        d="M4.80005 10.1011C4.80005 14.4228 8.6233 20.4001 12.0001 20.4001C15.179 20.4001 19.2 14.4228 19.2 10.1011C19.2 5.77938 15.9765 3.6001 12 3.6001C8.02356 3.6001 4.80005 5.77938 4.80005 10.1011ZM13.8708 13.2968C14.7499 12.4877 15.9764 12.1934 17.1084 12.4136C17.3477 13.4555 17.028 14.5844 16.1488 15.3935C15.2697 16.2026 14.0432 16.4969 12.9112 16.2767C12.6719 15.2348 12.9916 14.1059 13.8708 13.2968ZM6.89163 12.4136C8.02365 12.1934 9.25019 12.4877 10.1293 13.2968C11.0084 14.1059 11.3282 15.2348 11.0889 16.2766C9.95689 16.4968 8.73035 16.2026 7.85123 15.3935C6.9721 14.5843 6.6524 13.4555 6.89163 12.4136Z"
        fill="#1C1C21"
      />
    </svg>
  );
};

export default AvatarIcon;
