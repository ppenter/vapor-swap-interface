import React from 'react'

export default function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="64"
      preserveAspectRatio="xMidYMid"
      viewBox="-18 13 20 100"
      width="220"
      x={0}
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient id="a" x1=".645443" x2=".354557" y1=".237614" y2=".762386">
        <stop offset="0" stopColor="#fa0" />
        <stop offset="1" stopColor="#ff9000" />
      </linearGradient>
      <filter id="b" height="300%" width="300%" x="-100%" y="-100%">
        <feMorphology in="SourceAlpha" operator="erode" radius="1" result="alpha-erode" />
        <feConvolveMatrix
          divisor="1"
          in="alpha-erode"
          kernelMatrix="0 1 0 1 1 1 0 1 0"
          order="3,3"
          result="alpha-round"
        />
        <feMorphology in="alpha-round" operator="dilate" radius="3.5" result="dilate-shadow" />
        <feGaussianBlur in="dilate-shadow" result="shadow" stdDeviation="1.5" />
        <feFlood floodColor="#fff" result="flood-sticker" />
        <feComposite in="flood-sticker" in2="alpha-round" operator="in" result="comp-sticker" />
        <feMorphology in="comp-sticker" operator="dilate" radius="3" result="morph-sticker" />
        <feConvolveMatrix
          divisor="1"
          in="morph-sticker"
          kernelMatrix="0 1 0 1 1 1 0 1 0"
          order="3,3"
          result="sticker"
        />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="sticker" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <g filter="url(#b)">
        <path
          d="m20.03-39.74h11.52l-6.72 39.74h-16.89l-7.17-39.74h12.09l3.46 26.04h1.09zm36.35 0 7.3 39.74h-10.69l-1.21-6.27h-7.56l-1.21 6.27h-10.18l7.3-39.74zm-10.75 25.98h4.93l-2.24-14.21h-.45zm35.07.77h-2.94v12.99h-10.75v-39.74h12.99q6.85 0 10.18 3.13 3.32 3.14 3.32 10.31 0 7.16-3.13 10.24-3.14 3.07-9.67 3.07zm1.22-8.64q.58-1.09.58-3.91 0-2.81-.64-3.96-.64-1.16-2.56-1.16h-1.54v10.12h1.79q1.79 0 2.37-1.09zm17.18-13.95q3.68-4.8 12.07-4.8 8.38 0 12 4.73 3.61 4.74 3.61 15.39 0 10.66-3.71 15.78-3.71 5.12-12.03 5.12-8.32 0-11.97-5.06-3.65-5.05-3.65-15.71 0-10.65 3.68-15.45zm16.68 15.36q0-5.89-.93-7.97-.93-2.08-3.78-2.08-2.85 0-3.68 2.08-.83 2.08-.83 7.9v1.54q0 6.21.93 8.16.93 1.95 3.77 1.95 2.85 0 3.68-1.86.84-1.85.84-7.68zm42.56-6.92q0 3.59-1.09 5.96-1.09 2.36-3.39 4.28l5.31 16.9h-11.84l-3.97-14.34h-1.47v14.34h-10.75v-39.74h14.84q6.4 0 9.38 3 2.98 3.01 2.98 9.6zm-14.79 6.08q1.67 0 2.37-.96.7-.96.7-3.48 0-2.53-.7-3.52-.7-1-2.3-1h-1.73v8.96zm17.41-6.72q0-5.69 3.33-9.15 3.33-3.45 9.12-3.45 5.79 0 11.87 1.15l-1.28 10.24q-6.34-1.47-8.7-1.47-3.01 0-3.01 2.43 0 .96 1.44 1.85 1.44.9 3.49 1.89 2.04.99 4.09 2.37 2.05 1.38 3.49 3.94 1.44 2.56 1.44 5.88 0 6.08-3.26 9.41-3.27 3.33-9.25 3.33-5.99 0-11.68-1.86l.7-9.53q6.85 1.98 9.54 1.98 2.69 0 2.69-2.37 0-1.21-1.44-2.24-1.44-1.02-3.49-2.04-2.05-1.03-4.13-2.37-2.08-1.35-3.52-3.91-1.44-2.56-1.44-6.08zm58.5-11.96h10.11l-3.59 39.74h-13.18l-3.46-17.6h-.51l-2.88 17.6h-13.25l-4.16-39.74h10.5l1.66 21.05h.64l2.69-21.05h10.69l2.94 21.05h.64zm35.45 0 7.3 39.74h-10.69l-1.22-6.27h-7.55l-1.21 6.27h-10.18l7.3-39.74zm-10.75 25.98h4.93l-2.24-14.21h-.45zm35.07.77h-2.94v12.99h-10.75v-39.74h12.99q6.85 0 10.17 3.13 3.33 3.14 3.33 10.31 0 7.16-3.13 10.24-3.14 3.07-9.67 3.07zm1.22-8.64q.57-1.09.57-3.91 0-2.81-.64-3.96-.64-1.16-2.56-1.16h-1.53v10.12h1.79q1.79 0 2.37-1.09z"
          fill="url(#a)"
          stroke="#000"
          strokeWidth="3"
          transform="translate(-170 85)"
        />
      </g>
    </svg>
  )
}
