import Image from "next/image";

// Circular headshot with an initials fallback when no photo is on file.
export default function Avatar({
  name,
  photo,
  size = 120,
}: {
  name: string;
  photo: string | null;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-gold-soft text-navy flex items-center justify-center font-semibold"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials}
    </div>
  );
}
