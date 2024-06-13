/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        tsz: "var(--tsz)",
        "tsz-half": "var(--tsz-half)",
        "tsz-third": "var(--tsz-third)",
        bsz: "var(--bsz)",
      },
      height: {
        tsz: "var(--tsz)",
        "tsz-half": "var(--tsz-half)",
        "tsz-third": "var(--tsz-third)",
        bsz: "var(--bsz)",
      },
      minHeight: {
        tsz: "var(--tsz)",
        "tsz-half": "var(--tsz-half)",
        "tsz-third": "var(--tsz-third)",
        bsz: "var(--bsz)",
      },
      maxHeight: {
        tsz: "var(--tsz)",
        "tsz-half": "var(--tsz-half)",
        "tsz-third": "var(--tsz-third)",
        bsz: "var(--bsz)",
      },
      minWidth: {
        tsz: "var(--tsz)",
        "tsz-half": "var(--tsz-half)",
        "tsz-third": "var(--tsz-third)",
        bsz: "var(--bsz)",
      },
      maxWidth: {
        tsz: "var(--tsz)",
        "tsz-half": "var(--tsz-half)",
        "tsz-third": "var(--tsz-third)",
        bsz: "var(--bsz)",
      },
      backgroundSize: {
        "100%": "100%",
      },
    },
  },
  plugins: [],
};
