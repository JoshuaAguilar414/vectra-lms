export default function OttoLogo({
  className = "",
  title = "VECTRA International",
  src = "/vectra-logo.png"
}: {
  className?: string;
  title?: string;
  src?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`otto-logo ${className}`.trim()}
      src={src}
      alt={title}
      width={340}
      height={96}
    />
  );
}
