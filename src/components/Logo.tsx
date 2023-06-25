import { type SVGProps } from 'react'

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={50}
      height={56}
      viewBox="0 0 50 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.073 8.246A21.382 21.382 0 0011.2 9.483l-2.866 1.654-3.309-5.731L7.891 3.75a28 28 0 1126.384 49.361C30.423 55.012 25.455 56 21.891 56s-5.645-.535-8.377-1.666a21.89 21.89 0 1129.722-25.082A21.384 21.384 0 0030.073 8.246zM8.674 41.76c.376-7.115 6.264-12.768 13.472-12.768 6.93 0 12.64 5.225 13.404 11.95a15.273 15.273 0 10-26.876.818zm20.345.723a6.873 6.873 0 11-13.745 0 6.873 6.873 0 0113.745 0z"
        fill="#fff"
      />
    </svg>
  )
}
