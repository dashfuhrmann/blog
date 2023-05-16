import React from "react";
import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function StudioNavar(props: any) {
  return (
    <div>
      <div className="flex items-center justify-between bg-[#1a1a1a] p-5">
        <Link href="/" className="flex items-center text-primary">
          <ArrowUturnLeftIcon className="h-6 w-6 mr-2 text-primary" />
          Go to Website
        </Link>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
}
