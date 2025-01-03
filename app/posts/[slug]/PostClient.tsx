'use client';

import Link from "next/link";
import { useContentfulLiveUpdates, useContentfulInspectorMode } from "@contentful/live-preview/react";

import MoreStories from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";
import { Markdown } from "@/lib/markdown";

export default function PostClient({ post, morePosts }: { post: any; morePosts: any }) {
  const livePost = useContentfulLiveUpdates(post);
  const inspectorProps = useContentfulInspectorMode({ entryId: post.sys.id });

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <article>
        <h1
          {...inspectorProps({ fieldId: 'title' })}
          className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl"
        >
          {livePost.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          {livePost.author && (
            <Avatar name={livePost.author.name} picture={livePost.author.picture} />
          )}
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={livePost.title} url={livePost.coverImage.url} />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={livePost.author.name} picture={livePost.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg">
            <Date dateString={livePost.date} {...inspectorProps({ fieldId: 'date' })} />
          </div>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="prose">
            <Markdown content={livePost.content} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
