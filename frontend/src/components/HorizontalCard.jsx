import React from 'react';
import Button from './Button';
import Reveal from './Reveal';
import { ArrowRightIcon } from './icons';

export default function HorizontalCard({
  title,
  body,
  image,
  alt,
  href = '#',
  reversed = false,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 min-[820px]:grid-cols-2 min-[820px]:items-center min-[820px]:gap-[clamp(1.5rem,4vw,3rem)]">
      <Reveal
        className={`group relative overflow-hidden rounded-md shadow-[var(--shadow-md)]${
          reversed ? ' min-[820px]:order-2' : ''
        }`}
      >
        <img
          className="block aspect-[16/11] w-full object-cover transition-transform duration-[520ms] ease-brand group-hover:scale-[1.04]"
          src={image}
          alt={alt}
          loading="lazy"
        />
      </Reveal>
      <Reveal
        className={`flex flex-col items-start gap-4${
          reversed ? ' min-[820px]:order-1' : ''
        }`}
        delay={1}
      >
        <h3 className="text-[clamp(1.4rem,1.1rem+1.2vw,1.9rem)]">{title}</h3>
        <p className="max-w-[52ch] leading-[1.7] text-body">{body}</p>
        <Button as="a" href={href} variant="outline">
          Learn More
          <ArrowRightIcon />
        </Button>
      </Reveal>
    </div>
  );
}
