import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
      <path
         fill="url(#a)"
         d="M12 3c-5.07 0-9 3.714-9 8.73 0 2.622 1.075 4.89 2.826 6.456a.71.71 0 0 1 .24.513l.05 1.602a.72.72 0 0 0 1.01.637l1.787-.788a.724.724 0 0 1 .482-.036 9.845 9.845 0 0 0 2.605.347c5.07 0 9-3.715 9-8.73C21 6.718 17.07 3 12 3Z"
      />
      <path
         fill="#fff"
         d="m6.595 14.283 2.644-4.194a1.35 1.35 0 0 1 1.953-.36l2.104 1.577a.54.54 0 0 0 .65-.002l2.84-2.155c.378-.288.873.166.62.569l-2.645 4.191a1.35 1.35 0 0 1-1.953.36l-2.104-1.577a.54.54 0 0 0-.65.002l-2.84 2.156c-.378.288-.873-.165-.619-.567Z"
      />
      <defs>
         <radialGradient
            id="a"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(19.6128 0 0 19.6111 6.465 20.899)"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#09F" />
            <stop offset={0.61} stopColor="#A033FF" />
            <stop offset={0.935} stopColor="#FF5280" />
            <stop offset={1} stopColor="#FF7061" />
         </radialGradient>
      </defs>
   </svg>
);
export default SvgComponent;
