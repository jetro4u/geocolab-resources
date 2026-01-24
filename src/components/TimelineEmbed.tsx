import React from 'react';
import { useXOEmbed } from '@dndhub/xdk';

interface TimelineEmbedProps {
  profileUrl: string;
}

export const TimelineEmbed: React.FC<TimelineEmbedProps> = ({ profileUrl }) => {
  const { ref, html, loading } = useXOEmbed({
    kind: 'timeline',
    params: {
      url: profileUrl,
      theme: 'dark',
      chrome: 'noheader nofooter',
      limit: 5,
      dnt: true
    }
  });

  if (loading) return <p>Loading timeline…</p>;

  return (
    <section className="timeline-section">
      <h3>Latest Posts</h3>
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html ?? '' }}
      />
    </section>
  );
};