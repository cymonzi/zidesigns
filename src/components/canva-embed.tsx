"use client";

import React from 'react';

type CanvaEmbedProps = {
  src: string;
  title?: string;
  author?: string;
  href?: string;
};

export function CanvaEmbed({ src, title = 'Embedded design', author, href }: CanvaEmbedProps) {
  return (
    <section className="relative py-16" aria-label={title}>
      <div className="mx-auto max-w-4xl px-6">
        <div
          className="relative w-full"
          style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%', boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: 12, willChange: 'transform' }}
        >
          <iframe
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            src={src}
            allow="fullscreen"
            allowFullScreen
            title={title}
          />
        </div>
        {href && (
          <p className="mt-3 text-center text-sm text-muted">
            <a href={href} target="_blank" rel="noopener" className="text-[var(--primary)] underline-offset-4 hover:underline">
              {title}
            </a>
            {author ? ` by ${author}` : null}
          </p>
        )}
      </div>
    </section>
  );
}
