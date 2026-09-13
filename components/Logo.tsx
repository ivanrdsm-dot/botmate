import Image from "next/image";
export default function Logo({
  className = "h-7",
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <Image
      src="/media/botmate-wordmark.png"
      alt="Botmate"
      width={978}
      height={178}
      sizes="150px"
      className={`${className} w-auto`}
      priority={withWordmark}
    />
  );
}
