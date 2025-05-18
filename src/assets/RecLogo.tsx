import React from 'react';

interface RecLogoProps {
  className?: string;
}

export const RecLogo: React.FC<RecLogoProps> = ({ className = '' }) => {
  return (
    <img 
      src="https://res.cloudinary.com/dlnwacm5j/image/upload/v1747515720/rajalakshmi-logo_vrcxfv.png" 
      alt="REC Logo" 
      className={`h-auto w-full max-w-[300px] ${className}`}
    />
  );
};