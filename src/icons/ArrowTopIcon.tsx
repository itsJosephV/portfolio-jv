import {SVGProps} from "react";

export function ArrowTopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
