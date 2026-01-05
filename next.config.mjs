import mdx from "@next/mdx";

/**
 * Normalize any thrown value into a real Error instance.
 */
function toError(err) {
  if (err instanceof Error) return err;
  try {
    // If it's an object, try a JSON message
    return new Error(typeof err === "string" ? err : JSON.stringify(err));
  } catch {
    return new Error(String(err));
  }
}

/**
 * Wrap withMDX (or other plugin wrappers) to ensure we only rethrow Error instances.
 */
function safeWithWrapper(wrapperFn, config) {
  try {
    return wrapperFn(config);
  } catch (e) {
    throw toError(e);
  }
}

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default safeWithWrapper(withMDX, nextConfig);
