import React from "react";
import { draftMode } from "next/headers";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import PreviewSuspense from "../../components/PreviewSuspense";
import PreviewBlogList from "@/components/PreviewBlogList";
import BlogList from "@/components/BlogList";

const query = groq`
 *[_type=='post'] {
  ...,
  author->,
  categories[]->,
 } | order(_createdAt desc)
`;

const fallback = (
  <div role="status">
    <p
      className="text-center text-lg animate-pulse text-primar
"
    >
      Loading Preview Data...
    </p>
  </div>
);

async function Homepage() {
  const { isEnabled } = draftMode();
  const posts = await client.fetch(query);
  if (isEnabled) {
    return (
      <PreviewSuspense fallback={fallback}>
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  return <BlogList posts={posts} />;
}

export default Homepage;
