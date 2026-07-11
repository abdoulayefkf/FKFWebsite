import Image from "next/image";

type PageHeroProps = { eyebrow: string; title: string; description: string; image?: string };

export default function PageHero({ eyebrow, title, description, image = "/vision/initiative.jpg" }: PageHeroProps) {
  return (
    <header className="relative isolate flex min-h-[28rem] items-end overflow-hidden bg-black pt-28">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-45" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#e1b726]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200 sm:text-xl">{description}</p>
      </div>
    </header>
  );
}
