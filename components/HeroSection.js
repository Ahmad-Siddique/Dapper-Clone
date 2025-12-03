// components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#EFEFEF] pt-32 md:pt-40 pb-24">
      {/* BACKGROUND LEAF IMAGE ON RIGHT */}
      <div className="pointer-events-none absolute inset-y-0 right-[-8%] w-[100%] md:right-[-4%] md:w-[55%] lg:right-0 lg:w-[50%]">
        <Image
          src="/hero-plant.png"
          alt="Decorative plant"
          fill
          priority
          className="object-contain object-right"
          sizes="(min-width: 1024px) 650px, (min-width: 768px) 500px, 320px"
        />
      </div>

      {/* FOREGROUND CONTENT (relative so card can be absolute inside) */}
      <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-6">
        {/* Text block on the left */}
        <div className="max-w-[900px]">
          {/* Badge ABOVE title */}
          <div className="mb-12 flex items-center gap-3">
            <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
            <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-sm md:text-base font-semibold tracking-tight text-[#212121]">
              B2B Marketing Agency
            </span>
          </div>

          {/* FULL-WIDTH TITLE */}
          <h1 className="mb-14 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[0.95] tracking-tight text-[#111111]">
            <span className="block text-[46px] sm:text-[60px] md:text-[76px] lg:text-[90px] xl:text-[98px] font-bold">
              We build{' '}
              <span className="font-normal italic">
                high-performing
              </span>
            </span>
            <span className="mt-3 block text-[46px] sm:text-[60px] md:text-[76px] lg:text-[90px] xl:text-[98px] font-bold">
              marketing engines for
            </span>
            <span className="mt-3 block text-[46px] sm:text-[60px] md:text-[76px] lg:text-[90px] xl:text-[98px] font-bold">
              B2B Brands
            </span>
          </h1>

          {/* SUBCOPY */}
          <p className="mb-10 max-w-[560px] font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[19px] font-semibold leading-relaxed text-[#212121]">
            We build, optimize, and scale marketing engines that generate
            pipeline and improve marketing ROI.
          </p>

          {/* CTA BUTTON */}
          <Link
            href="#discover"
            className="inline-flex items-center gap-3 group"
          >
            <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] font-bold tracking-tight text-[#212121]">
              Discover more
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#74F5A1] transition-colors group-hover:bg-[#5fe58a]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                aria-hidden="true"
              >
                <path
                  d="M7 2V12M7 12L3 8M7 12L11 8"
                  fill="none"
                  stroke="#212121"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* STORYTEQ CARD */}
        <div
          className="
            mt-14 flex justify-end
            lg:mt-0 lg:absolute lg:right-16 lg:top-1/2 lg:-translate-y-1/2 lg:z-20
          "
        >
          <div className="w-[420px] max-w-full">
            <div className="flex overflow-hidden rounded-lg bg-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
              {/* Text area */}
              <div className="flex flex-1 flex-col justify-between px-5 py-5">
                <div>
                  <p className="mb-1 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7A7A7A]">
                    Results
                  </p>
                  <h3 className="mb-3 pr-2 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[15px] md:text-[16px] font-bold leading-snug text-[#212121]">
                    54% increase in pipeline with Demand Generation strategy
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="relative h-4 w-28">
                    <Image
                      src="/storyteq-logo.png"
                      alt="Storyteq"
                      fill
                      className="object-contain object-left"
                      sizes="112px"
                    />
                  </div>
                  <Link
                    href="#case-storyteq"
                    aria-label="Open Storyteq case study"
                    className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#74F5A1] transition-colors hover:bg-[#5fe58a]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 13L13 1M13 1H5M13 1V9"
                        fill="none"
                        stroke="#212121"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right visual */}
              <div className="relative hidden sm:block w-[150px] lg:w-[170px]">
                <Image
                  src="/storyteq-case.png"
                  alt="Campaign creative"
                  fill
                  className="object-cover"
                  sizes="170px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-20 h-px w-full border-b border-black/10" />
      </div>
    </section>
  );
}
