/** White VECTRA lockup for dark (#092543) footer backgrounds. */
export default function VectraFooterLogo({
  className = "vectra-footer-logo",
  title = "VECTRA International"
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 96"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Swirl mark — 5 curved petals */}
      <g fill="#ffffff" transform="translate(48 48)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M0-34c8-2 18 2 24 10 5 7 6 16 2 24-6-4-12-6-18-6-10 0-18 5-22 12 1-16 5-30 14-40z"
          />
        ))}
        <circle r="9" fill="#092543" />
      </g>
      <text
        x="108"
        y="48"
        fill="#ffffff"
        fontFamily="Poppins, Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="36"
        letterSpacing="1.5"
      >
        VECTRA
      </text>
      <text
        x="108"
        y="74"
        fill="#ffffff"
        fontFamily="Poppins, Arial, Helvetica, sans-serif"
        fontWeight="500"
        fontSize="13"
        letterSpacing="3.2"
      >
        INTERNATIONAL
      </text>
    </svg>
  );
}
