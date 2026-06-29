import React from 'react';
import HorizontalCard from './HorizontalCard';
import Reveal from './Reveal';

const CARDS = [
  {
    id: 'bears',
    title: 'Brown Bears Vs. Global Warming',
    image: '/api/media/research-bears.jpg',
    alt: 'Illustration of mountains and a lake',
    body:
      'Climate change has been a popular topic since James Hansen gave his testimony to Congress in 1988, expressing the disasters that would come from global warming. Many researchers are studying climate change in hopes of predicting its effects. If we can anticipate the outcomes of climate change, we can take measures to minimize or eliminate the catastrophes that will follow. In this thesis, we compare two models that determine the long-term outcome of two interactive species.',
    reversed: false,
  },
  // {
  //   id: 'second',
  //   title: 'Second Headline',
  //   image: '/api/media/research-house.svg',
  //   alt: 'Illustration of a dome house on a hill',
  //   body:
  //     'Horizontal card description \u2014 this is where we describe maybe some features or benefits in more detail, provide more content, or just show anything we perceive to be important. Even longer description.',
  //   reversed: true,
  // },
];

export default function Research() {
  return (
    <section className="section bg-page" id="research">
      <div className="container">
        <Reveal as="h2" className="section__title">
          Research
        </Reveal>
        <div className="[&>*+*]:mt-[clamp(2rem,5vw,4rem)]">
          {CARDS.map((card) => (
            <HorizontalCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
