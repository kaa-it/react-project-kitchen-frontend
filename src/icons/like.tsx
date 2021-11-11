import React from "react";

type TProps = {
  liked: boolean;
} & React.SVGAttributes<SVGElement>;

const unLiked: {
  strokeWidth: number | string | undefined;
  stroke: string | undefined;
  strokeLinecap: "butt" | "round" | "square" | "inherit" | undefined;
} = {
  stroke: "#F2F2F3",
  strokeWidth: 2,
  strokeLinecap: "round",
}

const LikeIcon: React.FC<TProps> = ({ liked }) => {



  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.84 4.61183C20.3292 4.10083 19.7228 3.69547 19.0554 3.41891C18.3879 3.14235 17.6725 3 16.95 3C16.2275 3 15.5121 3.14235 14.8446 3.41891C14.1772 3.69547 13.5708 4.10083 13.06 4.61183L12 5.67183L10.94 4.61183C9.9083 3.58013 8.50903 3.00053 7.05 3.00053C5.59096 3.00053 4.19169 3.58013 3.16 4.61183C2.1283 5.64352 1.54871 7.04279 1.54871 8.50183C1.54871 9.96086 2.1283 11.3601 3.16 12.3918L4.22 13.4518L12 21.2318L19.78 13.4518L20.84 12.3918C21.351 11.8811 21.7563 11.2746 22.0329 10.6072C22.3095 9.93972 22.4518 9.22431 22.4518 8.50183C22.4518 7.77934 22.3095 7.06393 22.0329 6.39647C21.7563 5.72901 21.351 5.12258 20.84 4.61183Z"
        {...(liked ? {fill: "#F20D33"} : unLiked)}
      />
    </svg>
    
  );
};

export default LikeIcon;
