// import { ImagePlus } from "lucide-react";
// import { OUR_STORY } from "@/lib/config";
// import { Reveal } from "@/components/Reveal";
// import { SectionEyebrow } from "@/components/Ornament";

// /**
//  * OUR STORY — placeholder section.
//  * EDITABLE: once photos and copy are ready, populate
//  * OUR_STORY.photo and OUR_STORY.paragraphs in lib/config.ts. This
//  * component will render them automatically — no code changes needed
//  * for text. To add a real photo, drop it in /public/images and pass
//  * { src: "/images/your-photo.jpg", alt: "..." }.
//  */
// export function OurStory() {
//   return (
//     <section className="mx-auto max-w-md px-8 py-16 text-center">
//       <Reveal>
//         <SectionEyebrow>{OUR_STORY.heading}</SectionEyebrow>
//       </Reveal>

//       <Reveal delay={0.1}>
//         <div className="mx-auto mt-8 flex aspect-[4/5] w-48 items-center justify-center border border-dashed border-gold-muted bg-background-alt/50">
//           {OUR_STORY.photo ? (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img
//               src={OUR_STORY.photo.src}
//               alt={OUR_STORY.photo.alt}
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <ImagePlus className="h-8 w-8 text-gold-muted" strokeWidth={1} aria-hidden="true" />
//           )}
//         </div>
//       </Reveal>

//       <Reveal delay={0.2}>
//         <div className="mt-8 space-y-3">
//           {OUR_STORY.paragraphs.map((paragraph, i) => (
//             <p key={i} className="font-display text-lg italic leading-relaxed text-text-muted">
//               {paragraph}
//             </p>
//           ))}
//         </div>
//       </Reveal>
//     </section>
//   );
// }
