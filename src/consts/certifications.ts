interface Certification {
  name: string;
  url: string;
}

export const certifications = [
  {
    name: "DHS Trusted Tester Certification",
    url: "https://zenn.dev/mehm8128/articles/trusted-tester",
  },
  {
    name: "kintone認定アソシエイト",
    url: "https://sizu.me/mehm8128/posts/sfuw6k948udz",
  },
] as const satisfies Certification[];
