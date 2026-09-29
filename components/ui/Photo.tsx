interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  zoom?: boolean;
}

/** Single place to swap or optimise images later. Container controls aspect ratio and shape. */
export default function Photo({ src, alt, className = "", imgClassName = "", zoom = false }: Props) {
  return (
    <div className={`overflow-hidden bg-peach ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${zoom ? "transition-transform duration-700 ease-out group-hover:scale-105" : ""} ${imgClassName}`}
      />
    </div>
  );
}
