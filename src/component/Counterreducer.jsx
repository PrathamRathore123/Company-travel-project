import React, { useEffect, useRef } from "react";

const FanCards = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cards = Array.from(stage.children);

    let active = 0;

    function slotFor(offset, n) {
      if (offset === 0) return "center";
      if (offset === 1) return "right1";
      if (offset === 2) return "right2";
      if (offset === n - 1) return "left1";
      if (offset === n - 2) return "left2";
      return "park";
    }

    function render() {
      const n = cards.length;
      for (let i = 0; i < n; i++) {
        const offset = ((i - active) % n + n) % n;
        const slot = slotFor(offset, n);

        cards[i].setAttribute("data-slot", slot);

        if (slot === "park") {
          cards[i].style.opacity = "0";
          cards[i].style.pointerEvents = "none";
        } else {
          cards[i].style.opacity = "1";
          cards[i].style.pointerEvents = "";
        }
      }
    }

    // Keep hover behavior for better UX
    stage.addEventListener("mouseenter", () => {
      // Optional: Add any hover effects here if needed
    });
    stage.addEventListener("mouseleave", () => {
      // Optional: Remove any hover effects here if needed
    });

    cards.forEach((c, i) =>
      c.addEventListener("click", () => {
        active = i;
        render();
      })
    );

    render();

    return () => {
      // No timer to clear since automatic rotation is removed
    };
  }, []);

  return (
    <div className="wrap">
      <style>{`
        :root {
          --w: 260px; --h: 380px; --radius: 18px;
          --speed: 2000ms; --interval: 500ms;
          --easing: cubic-bezier(.2, .7, .2, 1);
          --gap: 240px; --lift: 24px; --lift2: 44px;
          --center-scale: 1.13; --center-drop: 10px;
        }
        body {margin:0; font-family:Inter,system-ui,Arial,sans-serif;}
        .wrap{max-width:980px; margin:56px auto; padding:0 16px;}
        .tabs{display:flex; gap:10px; justify-content:center; margin-bottom:22px}
        .tab{padding:6px 12px; border-radius:999px; font-size:12px; background:#f3f4f7; border:1px solid #e6e8ee; color:#5b5f6b; cursor:pointer;}
        .tab.is-active{background:#6a4df5; border-color:#6a4df5; color:#fff}
        .stage{ position:relative; height:460px; display:block;}
        .card{position:absolute; left:50%; top:50%; width:var(--w); height:var(--h);
          transform:translate(-50%,-50%); transform-origin:50% 60%; border-radius:var(--radius);
          overflow:hidden; background:#000; box-shadow:0 18px 42px rgba(0,0,0,.28),0 6px 16px rgba(0,0,0,.22);
          will-change:transform, filter, opacity, box-shadow;
          transition:transform var(--speed) var(--easing),filter var(--speed) var(--easing),
          opacity var(--speed) var(--easing), box-shadow var(--speed) var(--easing);}
        .card img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover;}
        .card[data-slot="center"]{z-index:6; box-shadow:0 24px 56px rgba(0,0,0,.35),0 10px 22px rgba(0,0,0,.25);}
        .card:not([data-slot="center"]) img{filter:grayscale(1) contrast(.9) brightness(.9); opacity:.75;}
        .card[data-slot="center"] img{filter:none; opacity:1;}
        .card[data-slot="center"]{transform:translate(-50%,calc(-50% + var(--center-drop))) rotateZ(0deg) translateX(0) translateY(0) scale(var(--center-scale));}
        .card[data-slot="left1"]{transform:translate(-50%,-50%) rotateZ(-24deg) translateX(calc(-1 * var(--gap))) translateY(var(--lift)) scale(.95); z-index:4;}
        .card[data-slot="right1"]{transform:translate(-50%,-50%) rotateZ(24deg) translateX(var(--gap)) translateY(var(--lift)) scale(.95); z-index:4;}
        .card[data-slot="left2"]{transform:translate(-50%,-50%) rotateZ(-36deg) translateX(calc(-2 * var(--gap))) translateY(var(--lift2)) scale(.9); z-index:3;}
        .card[data-slot="right2"]{transform:translate(-50%,-50%) rotateZ(36deg) translateX(calc(2 * var(--gap))) translateY(var(--lift2)) scale(.9); z-index:3;}
        .card[data-slot="park"]{transition:none !important; transform:translate(-50%,-50%) scale(.001) rotateZ(0deg); opacity:0; z-index:1;}
        .badge{position:absolute; left:10px; top:10px; font-size:12px; background:rgba(0,0,0,.65); color:#ffd66b;
          border:1px solid rgba(255,255,255,.14); padding:4px 8px; border-radius:999px;}
        .overlay{position:absolute; inset:auto 0 0 0; padding:16px;
          background:linear-gradient(180deg,rgba(0,0,0,0) 0%, rgba(0,0,0,.65) 60%, rgba(0,0,0,.9) 100%);
          color:#e9edf5; font-size:14px;}
        .title{margin:0 0 4px; font-size:18px; font-weight:700}
        .meta{opacity:.85; font-size:12px}
      `}</style>

      <div className="tabs" aria-hidden="true">
        <button className="tab is-active">Popular</button>
        <button className="tab">Latest</button>
        <button className="tab">Top Rated</button>
        <button className="tab">Recommended</button>
      </div>

      <div className="stage" ref={stageRef} aria-label="Fan cards gallery">
        {[
          { title: "The Morning Show", meta: "2019 - TV - Drama", img: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop", badge: "8.0" },
          { title: "You", meta: "2018 - TV - Thriller", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
          { title: "Oppenheimer", meta: "2023 - Film", img: "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?q=80&w=1200&auto=format&fit=crop" },
          { title: "Stranger Things", meta: "2016 - TV - Sci‑Fi", img: "https://images.unsplash.com/photo-1510511233900-1982d92bd835?q=80&w=1200&auto=format&fit=crop" },
          { title: "Oppenheimer", meta: "2023 - Film", img: "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?q=80&w=1200&auto=format&fit=crop" },
          // duplicated
          { title: "The Morning Show", meta: "2019 - TV - Drama", img: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop" },
          { title: "You", meta: "2018 - TV - Thriller", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
          { title: "Oppenheimer", meta: "2023 - Film", img: "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?q=80&w=1200&auto=format&fit=crop" },
          { title: "Stranger Things", meta: "2016 - TV - Sci‑Fi", img: "https://images.unsplash.com/photo-1510511233900-1982d92bd835?q=80&w=1200&auto=format&fit=crop" },
          { title: "Oppenheimer", meta: "2023 - Film", img: "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?q=80&w=1200&auto=format&fit=crop" },
        ].map((card, idx) => (
          <article className="card" key={idx}>
            {card.badge && <span className="badge">{card.badge}</span>}
            <img src={card.img} alt={card.title} />
            <div className="overlay">
              <h3 className="title">{card.title}</h3>
              <div className="meta">{card.meta}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FanCards;