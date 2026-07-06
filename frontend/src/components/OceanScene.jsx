import React from 'react';

// Layered animated ocean (sea gradient + drifting wave bands) with an original
// surfing rooster that gently bobs. Visual styling lives in index.css (.ocean*).
export default function OceanScene() {
  return (
    <div className="ocean absolute inset-0">
      <div className="ocean__sea" />
      <div className="ocean__wave ocean__wave--back" />
      <div className="ocean__wave ocean__wave--mid" />
      <div className="ocean__wave ocean__wave--front" />
      <img
        className="ocean__surfer"
        src="/assets/surfing-rooster.svg"
        alt=""
        width="240"
        height="210"
        loading="eager"
      />
    </div>
  );
}
