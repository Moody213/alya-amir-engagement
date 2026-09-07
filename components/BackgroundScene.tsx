import Image from "next/image";

export function BackgroundScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Image
        src="/background-top.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 672px) 672px, 100vw"
        className="object-cover object-top"
      />
    </div>
  );
}
