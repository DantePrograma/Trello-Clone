export const CheckedCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="19px"
    viewBox="0 -960 960 960"
    width="19px"
    fill="none" // No queremos un color de relleno global
    stroke="#22A06B" // Borde verde si se necesita
  >
    {/* Círculo verde */}
    <circle cx="480" cy="-480" r="400" fill="#22A06B" />

    {/* Check en blanco */}
    <path
      d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Z"
      fill="#FFFFFF"
    />
  </svg>
);
