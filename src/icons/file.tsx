import React from 'react';
import { getColorByType } from '../utils';
import { TIconWithTypeProps } from '../types';

const FileIcon: React.FC<TIconWithTypeProps> = ({ type }) => {
  const color = getColorByType(type);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.4403 11.05L12.2503 20.24C11.1244 21.3658 9.59747 21.9983 8.00529 21.9983C6.41311 21.9983 4.88613 21.3658 3.76029 20.24C2.63445 19.1141 2.00195 17.5872 2.00195 15.995C2.00195 14.4028 2.63445 12.8758 3.76029 11.75L12.9503 2.55998C13.7009 1.80942 14.7188 1.38776 15.7803 1.38776C16.8417 1.38776 17.8597 1.80942 18.6103 2.55998C19.3609 3.31054 19.7825 4.32852 19.7825 5.38998C19.7825 6.45144 19.3609 7.46942 18.6103 8.21998L9.41029 17.41C9.03501 17.7853 8.52602 17.9961 7.99529 17.9961C7.46456 17.9961 6.95557 17.7853 6.58029 17.41C6.20501 17.0347 5.99418 16.5257 5.99418 15.995C5.99418 15.4643 6.20501 14.9553 6.58029 14.58L15.0703 6.09998"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FileIcon;
