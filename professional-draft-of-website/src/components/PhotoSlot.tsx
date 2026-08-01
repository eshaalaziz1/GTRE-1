import Image from "next/image";

/**
 * A framed photo area. Renders a real image when a src is supplied, otherwise a
 * clean duotone placeholder (not a broken box) so the layout reads correctly
 * until real photography is dropped in.
 */
export default function PhotoSlot({
  src,
  alt,
  className = "",
  ratio = "aspect-[3/2]",
  imgClassName = "",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  ratio?: string;
  // Extra classes on the <Image> itself, e.g. "scale-110" to zoom, or an
  // object-position utility to shift the crop.
  imgClassName?: string;
}) {
  if (src) {
    return (
      <div className={`relative ${ratio} overflow-hidden rounded-br-[2rem] ${className}`}>
        <Image src={src} alt={alt} fill className={`object-cover ${imgClassName}`} />
      </div>
    );
  }
  return (
    <div
      className={`relative ${ratio} overflow-hidden rounded-br-[2rem] bg-navy ${className}`}
      aria-label={`${alt} (placeholder)`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #003057 0%, #00253f 55%, #001f3a 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{ background: "radial-gradient(circle at 75% 25%, #b3a369 0%, transparent 50%)" }}
      />
      <div className="absolute bottom-4 left-5 text-white/40 text-[11px] uppercase tracking-[0.2em]">
        Photo
      </div>
    </div>
  );
}
