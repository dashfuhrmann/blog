import React from "react";

function Banner() {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10 py-10 mb-10">
      <div>
        <h1 className="text-7xl">Peach&apos;s Blog</h1>
        <h2 className="mt-5">
          Welcome to {""}
          <span className="underline decoration-4 decoration-primary">
            Every Athlets
          </span>{" "}
          {""}
          favourite blog on the Internert
        </h2>
      </div>

      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
        New blog posts | Why colagene is overrated by climbers | Statistic
        Basics to understand research & More!
      </p>
    </div>
  );
}

export default Banner;
