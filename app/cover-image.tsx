'use client';

import ContentfulImage from "../lib/contentful-image";
import Link from "next/link";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
  title,
  url,
  slug,
  assetId
}: {
  title: string;
  url: string;
  slug?: string;
  assetId: string;
}) {
  const liveImage = useContentfulLiveUpdates({
    sys: { id: assetId, type: 'Asset' },
    fields: { file: { url } },
  });

  const addHttpsProtocol = (url: string) => (url?.startsWith('http') ? url : `https:${url}`);
  const liveUrl = addHttpsProtocol(liveImage?.fields?.file?.url || url);
  
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      width={2000}
      height={1000}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={liveUrl}
      {...ContentfulLivePreview.getProps({
        assetId: liveImage?.sys?.id,
        fieldId: 'file',
      })}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
