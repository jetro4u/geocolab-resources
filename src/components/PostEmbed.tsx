import React from 'react';
import { useXOEmbed } from '@dndhub/xdk';

interface PostEmbedProps {
  postUrl: string;
  theme?: 'light' | 'dark';
}

export const PostEmbed: React.FC<PostEmbedProps> = ({
  postUrl,
  theme = 'light'
}) => {
  const { ref, html, loading, error } = useXOEmbed({
    kind: 'post',
    params: {
      url: postUrl,
      theme,
      hide_thread: true,
      dnt: true
    }
  });

  if (loading) return <p>Loading Post…</p>;
  if (error) return <p>Failed to load Post</p>;

  return (
    <div
      ref={ref}
      className="post-embed"
      dangerouslySetInnerHTML={{ __html: html ?? '' }}
    />
  );
};