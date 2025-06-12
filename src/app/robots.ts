import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_ENV === "PROD";

  if (isProduction) {
    // Allow indexing in production
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: "/cgi-bin/",
        },
      ],
    };
  } else {
    // Disallow indexing in non-production environments
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }
}
