import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import React from "react";
import { RichTextComponents } from "@/components/RichTextComponents";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params: { slug } }: Props) {
  const query = groq`
    *[_type=='post' && slug.current == $slug][0]
    {
        ...,
        author->,
        categories[]->
    }
`;

  const post: Post = await client.fetch(query, { slug });

  return {
    title: post.title,
    description: post.description,
    keywords: post.categories.map((category) => category.title),
    openGraph: {
      url: `/${slug}`,
      title: post.title,
      description: post.description,
      images: [
        {
          url: urlFor(post.mainImage).url(),
          width: 800,
          height: 600,
          alt: "Og Blog Post Image",
          type: "image/jpeg",
        },
      ],
    },
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const query = groq`
    *[_type=='post']
    {
        slug
    }
    `;

  const slugs: Post[] = await client.fetch(query);

  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({ slug }));
}

async function Post({ params: { slug } }: Props) {
  const query = groq`
        *[_type=='post' && slug.current == $slug][0]
        {
            ...,
            author->,
            categories[]->
        }
    `;

  const post: Post = await client.fetch(query, { slug });

  return (
    <>
      <article className="px-10 pb-28">
        <section className="space-y-2 border-primary text-white">
          <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
            <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
              <Image
                className="object-over object-center mx-auto"
                src={urlFor(post.mainImage).url()}
                alt={post.author.name}
                fill
              />
            </div>

            <section className="p-5 bg-primary w-full">
              <div className="flex flex-col md:flex-row justify-between gap-y-5">
                <div>
                  <h1 className="text-4xl font-extrabold">{post.title}</h1>
                  <p>
                    {new Date(post._createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Image
                    className="rounded-full"
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    height={40}
                    width={40}
                  />
                  <div className="w-64">
                    <h3 className="text-lg font-bold">{post.author.name}</h3>
                    <div>{/*AUTHOR BIO */}</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="italic pt-10">{post.description}</h2>
                <div className="flex items-center justify-end mt-auto space-x-2">
                  {post.categories.map((category) => (
                    <div
                      key={category.title}
                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                    >
                      <p>{category.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>

        <PortableText value={post.body} components={RichTextComponents} />
      </article>
    </>
  );
}

export default Post;
