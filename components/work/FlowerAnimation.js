"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// All flower image URLs from the HTML
const flowerImages = [
  "https://framerusercontent.com/images/ivazyeuOl1JGCYfALIBiGvg6ns.webp",
  "https://framerusercontent.com/images/1nvPyff4ED7RfDnuYvNH4Z3gbRM.webp",
  "https://framerusercontent.com/images/YocOTUvkC17hNlKxh5X4MOZrYA.webp",
  "https://framerusercontent.com/images/8kXwutQDBtvFeKoOj3cUv8ffaA.webp",
  "https://framerusercontent.com/images/omYqbaOavKOL7NONZhhhZRe5Q.webp",
  "https://framerusercontent.com/images/zULfzTbcvq6qHUP0bFKRy0S0bhc.webp",
  "https://framerusercontent.com/images/rEnxMcQPXuKeyCjkB1Wc8MIIcL0.webp",
  "https://framerusercontent.com/images/WFtPMPv7gjUgfnRZ1H7oMONdCM.webp",
  "https://framerusercontent.com/images/A4itn32SCuxXOUlzqPcfZ5STwk.webp",
  "https://framerusercontent.com/images/06WWAs5ww6z1PXfNuX9vlY6ato.webp",
  "https://framerusercontent.com/images/0OYhkPJqHFtE36mzLLJss0C8W0M.webp",
  "https://framerusercontent.com/images/1M4MjaVHGK0hQaOogc6Ry3Xj68.webp",
  "https://framerusercontent.com/images/dmjspHcLdJJ3b3szSKDAMohnY.webp",
  "https://framerusercontent.com/images/BKZgZ58iH36ioScSb8fLki3yU.webp",
  "https://framerusercontent.com/images/vIaHSuD9nVWAvSd2ossiDM7XE0.webp",
  "https://framerusercontent.com/images/abXfh2yxb8RusqqBlDQa23vwVs.webp",
  "https://framerusercontent.com/images/fQP8rR1MbBkQoKMaFSGTJM2BTk.webp",
  "https://framerusercontent.com/images/42LxgbUGHyKEwvbeYc38GbvKXwE.webp",
  "https://framerusercontent.com/images/UzXujAj3IqZQR5t2mq7kY4eZr3I.webp",
  "https://framerusercontent.com/images/3YigoGKTy5eJZVu6WnvTuV88.webp",
  "https://framerusercontent.com/images/WXIeUB1XfZQx7bq1TaRheeRqjc.webp",
  "https://framerusercontent.com/images/vc8TDijFwlVQAq08iXuq8NV9fM.webp",
  "https://framerusercontent.com/images/QhhYcb35eAEbx7AM5LcFw5FI4.webp",
  "https://framerusercontent.com/images/oNGDq1gLIAZQtxWauq9DZsx9bA.webp",
  "https://framerusercontent.com/images/rZWBzdhM17JVwHb6Am5vMgrra4.webp",
  "https://framerusercontent.com/images/sVmaTtRNkh7CdI74UFUST7wNlog.webp",
  "https://framerusercontent.com/images/K1PLL1I1lBx5zqeurh7dHx2ZAQY.webp",
  "https://framerusercontent.com/images/Y3EMYEPE8ijYNeC7wH3Ph6PUCw.webp",
  "https://framerusercontent.com/images/TUfLt0hAad3jxJYJ571Rd4INg.webp",
  "https://framerusercontent.com/images/24tQIP813CnfDCxFKmofvTs6cM.webp",
  "https://framerusercontent.com/images/vDTOqT8kIfIDMOxydw6v5JqjlA.webp",
  "https://framerusercontent.com/images/KGNYJBp7BcSDtV5cwmBfp2yirY.webp",
  "https://framerusercontent.com/images/10UFPEdFeJpj58dhHsAWMhn0EPg.webp",
  "https://framerusercontent.com/images/VOSyE6e1brvEp0wBSYD9Dcw9BDA.webp",
  "https://framerusercontent.com/images/NximUZ6k5wQZXrqd7aWWTf1qc.webp",
  "https://framerusercontent.com/images/JX7N5cgEloOhAFs6hzJ1GmOXMro.webp",
  "https://framerusercontent.com/images/7X1bQ8LNRYenKvNEIvF2XBkjsBg.webp",
  "https://framerusercontent.com/images/fDKiIlw1wFpggcN1EOvW3dEM4Bc.webp",
  "https://framerusercontent.com/images/j6PCZzyj9Vch1eJ8Ty3vVkH8fwI.webp",
  "https://framerusercontent.com/images/qa2nrFr893RY16w30lxZCFzcMuo.webp",
  "https://framerusercontent.com/images/7kLgq3DGzYn5MEBkjTWyu1eYSs.webp",
  "https://framerusercontent.com/images/GIWiqRbBbpypBaBZ6s0yFai26k.webp",
  "https://framerusercontent.com/images/x9DEA9e42hRtopoSSKOeoT0WCF8.webp",
  "https://framerusercontent.com/images/5FHwgPZAuuIpDzKEOad5lYmMPOo.webp",
  "https://framerusercontent.com/images/3vkS4mCRrq04rtw2SrZAnJvi0.webp",
  "https://framerusercontent.com/images/Ygy0TMSf3fRQLVA6bJrYJl3NIXQ.webp",
  "https://framerusercontent.com/images/LlUPJJwt9MwMtA2sjghifkQsLt8.webp",
  "https://framerusercontent.com/images/bNJJo1g0HFfNwmPrF02vY4uKRPw.webp",
  "https://framerusercontent.com/images/vc5Nh9z0bltlzOyj7iyQoDieRGw.webp",
  "https://framerusercontent.com/images/2nMVTZkuc0RxHnN9xVcy57TIrE.webp",
  "https://framerusercontent.com/images/3YrzC9NmJRppP20dQkA51UP8ELo.webp",
  "https://framerusercontent.com/images/1EAcJIqR1giVMquNpLGyDRUSOTs.webp",
  "https://framerusercontent.com/images/wUQ4lyPy2XAkFTi75tZVb8gX8.webp",
  "https://framerusercontent.com/images/waqvuWenCIuwl6j1gJquU0P4Wc0.webp",
  "https://framerusercontent.com/images/ALupIHgtFQVE2KzW6SFYT1amG9Q.webp",
  "https://framerusercontent.com/images/7NWBKwjKHCyehGvR9Whg4S8F3xw.webp",
  "https://framerusercontent.com/images/auVtApEXEmsSL9NRIf8hqOybog.webp",
  "https://framerusercontent.com/images/pvgSIwFJVWWb0mYa90U2wT6RQXQ.webp",
  "https://framerusercontent.com/images/NMo2EgMs6ybP4xsHrpSOXw3oAA8.webp",
  "https://framerusercontent.com/images/PANiVCKlcfFhQ5dTgOY1e5neYnU.webp",
  "https://framerusercontent.com/images/CuREaQmHrzgulzeXVWSeaLwWcU.webp",
  "https://framerusercontent.com/images/LiHc3rFEqkqvPBsdBFqdP8eu6o.webp",
  "https://framerusercontent.com/images/33ff4pfpHDDMvY9Af2BsxfyqM.webp",
  "https://framerusercontent.com/images/RpNKjhb4J0SethwNz3pUv5iDPV0.webp",
  "https://framerusercontent.com/images/UN8h7X4HgVvUI6RPs4TAmoGIYU.webp",
  "https://framerusercontent.com/images/yVnxc6su5dCJIHokCzxF8yR6Ga4.webp",
  "https://framerusercontent.com/images/3dLeQzTGaw9dK4JdjhWgMjx4wQ.webp",
  "https://framerusercontent.com/images/Zp4h5a2nUudhm7eUJkojb1pt8.webp",
  "https://framerusercontent.com/images/IwuVenF2ANJ8ZHJuMQ5KdkkPsw.webp",
  "https://framerusercontent.com/images/TKOuwPTS95wMpwk9kMH6F6hrU4.webp",
  "https://framerusercontent.com/images/fbx5NSu2eMohPbOzK6C21mUjR9A.webp",
  "https://framerusercontent.com/images/SBkdg5vZ7W36QmFbXBMJW4T3IzI.webp",
  "https://framerusercontent.com/images/k1xZ6UCHsDCNfZaOnx7Xnb4qgs.webp",
  "https://framerusercontent.com/images/44bCNJ0znztOFmPNp0OLtVXDSA.webp",
  "https://framerusercontent.com/images/rWhafef2sGBDllsFIFxovpWIg.webp",
  "https://framerusercontent.com/images/X56HMFd15cFk1CpcMQ18x4o1TEo.webp",
  "https://framerusercontent.com/images/lu93UtXnabFT0zhbnFfpuj8LilI.webp",
  "https://framerusercontent.com/images/5GOTf1xzD95hIjMTkp1dS80gq3U.webp",
  "https://framerusercontent.com/images/l97cFc9D0ePLQbO4rdOGKuwy7uQ.webp",
  "https://framerusercontent.com/images/Og8EXd10tYIJDYJ5pGv3So4QuB8.webp",
  "https://framerusercontent.com/images/AYBMYtoQyog6qprQglTBfjlh0.webp",
  "https://framerusercontent.com/images/MzgVC8Lc4tBKcXLQIn682J9GM.webp",
  "https://framerusercontent.com/images/DrlFGESJVdEBu0W3xoWvfJ5B9t0.webp",
  "https://framerusercontent.com/images/fbKWRIMgtMPHXrcKoMbWKITWdY.webp",
  "https://framerusercontent.com/images/XUcE1yCdKPAG8Y8zBfN8aVWlhqI.webp",
  "https://framerusercontent.com/images/wBs3bBUiacOaEnUJNDLI6kdxxSs.webp",
  "https://framerusercontent.com/images/mHHH4dkQn78Tza3XWQc1fgWAclE.webp",
  "https://framerusercontent.com/images/SyDAMwS7ZI7VhAIiCORXF2EsyKg.webp",
  "https://framerusercontent.com/images/piypf3RpYpmgXDDytbl0SNFLDk0.webp",
  "https://framerusercontent.com/images/idxkplAvlMdoycMTbepA7FU.webp",
  "https://framerusercontent.com/images/nmb8RezOWPWIQRzbe31IiK4TZ4w.webp",
  "https://framerusercontent.com/images/isUViFaiuKQHVXS4430XgPrio.webp",
  "https://framerusercontent.com/images/cx5KB3qVT69GPsQ3Wg8pZ22ed0.webp",
  "https://framerusercontent.com/images/b1uDTII0qEEpg5LIfltGxFxvyE.webp",
  "https://framerusercontent.com/images/0zWnd6s1LhW8RB02sj5hl6NV1o.webp",
  "https://framerusercontent.com/images/VFkYwzVDDWmdMoyyIkCU5Jwc.webp",
  "https://framerusercontent.com/images/W0kVCyTkQyVLAVkRHAOeYVgoSOY.webp",
  "https://framerusercontent.com/images/fTVX9VxihfmFpA4oJWiugSC7E8.webp",
  "https://framerusercontent.com/images/XeNhenmyD7dTJD4uwYAcIAapRwc.webp",
  "https://framerusercontent.com/images/9Mz79veuxE9TjO14qY5tpOGkMeU.webp",
  "https://framerusercontent.com/images/e8zlltRf7jqDZsQoGW42kBaiY4.webp",
  "https://framerusercontent.com/images/7IbMPWhNyuFnSubQRkCD24RGU.webp",
  "https://framerusercontent.com/images/lP40Vsf1F4VMo8PlQF0OMxNpR3I.webp",
  "https://framerusercontent.com/images/IMlxtXOMjwEIholq36NHwE97Ubg.webp",
  "https://framerusercontent.com/images/bAuVfKc9nIb8w7aPmFnGcxarNA4.webp",
  "https://framerusercontent.com/images/jDH04OPDxTSrqYx4TL8PKusc.webp",
  "https://framerusercontent.com/images/ifwf7dvYZph0d3YjDxwSRbd4uAU.webp",
  "https://framerusercontent.com/images/Aot9d0lSd6Vqu9htwgNaZ25S48.webp",
  "https://framerusercontent.com/images/fUReeb2hHJaXezP9iumRwFE8A.webp",
  "https://framerusercontent.com/images/xFp3AQxKDH1EBGmTIaGKmqnKU0.webp",
  "https://framerusercontent.com/images/xym0IJPWufO1IZrbWwyzcTqWrOs.webp",
  "https://framerusercontent.com/images/B1bRnsPoka36P6ztZVugQ3BWFI.webp",
  "https://framerusercontent.com/images/zGKgtJsCvTXyKcPMxVXnUz8QG9M.webp",
  "https://framerusercontent.com/images/QlWXTXhA2TOrraequVoUDLLfrg.webp",
  "https://framerusercontent.com/images/bddrcbVLoeJiI4zeNr8xPgNxxE.webp",
  "https://framerusercontent.com/images/db2nrYbsMcP2ZviDBwBNkDSjkP4.webp",
  "https://framerusercontent.com/images/RSEQ8mPuqFeDUGuKmOJ1S1mYDw.webp",
  "https://framerusercontent.com/images/uTdVe6VCE1RPSXuaKoMbJVGlA.webp",
  "https://framerusercontent.com/images/v0vE8u2339J2z9j0ChSovygWPo.webp",
  "https://framerusercontent.com/images/9jwe9MO3H7Yg8CBgGyxupgiGd68.webp",
  "https://framerusercontent.com/images/3zk20SYE8DVDQLT0MbakOMsts8A.webp",
  "https://framerusercontent.com/images/3O9GZSq8HZQu3oKgXi0k8lIY.webp",
  "https://framerusercontent.com/images/BZ118hdTnqndwahmRayIguColl4.webp",
  "https://framerusercontent.com/images/xwWNx1RUw0So9HakRlruA1X64.webp",
  "https://framerusercontent.com/images/tO9MKaRoLXckX44W64DKUTHM.webp",
  "https://framerusercontent.com/images/Xbdzh2WoY1R2cpcnBRDV190.webp",
  "https://framerusercontent.com/images/CuRMZeuYpsmqxUqaWYEnozYR8Lc.webp",
  "https://framerusercontent.com/images/zCIfuvDx0sy7wF6m9IRbQli0c.webp",
];

export default function FlowerAnimation() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images for smooth animation
  useEffect(() => {
    const preloadImages = async () => {
      const promises = flowerImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, []);

  // ScrollTrigger animation
  useEffect(() => {
    if (!sectionRef.current || !imagesLoaded) return;

    const section = sectionRef.current;
    const totalFrames = flowerImages.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const frame = Math.min(
            Math.floor(self.progress * totalFrames),
            totalFrames - 1
          );
          setCurrentFrame(frame);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgb(30, 19, 16) 25%, rgb(144, 60, 39) 50%, rgb(228, 108, 68) 75%, rgb(237, 148, 84) 100%)",
      }}
    >
      {/* Flower Image Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-full max-w-[1200px] aspect-square">
          {/* Only render current frame for performance */}
          <img
            src={flowerImages[currentFrame]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 py-6 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <p
            className="text-sm"
            style={{ color: "rgba(249, 250, 251, 0.8)" }}
          >
            © 2025 New Genre
          </p>
          <a
            href="/privacy"
            className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: "rgba(249, 250, 251, 0.8)" }}
          >
            Privacy
          </a>
        </div>
      </div>
    </section>
  );
}
