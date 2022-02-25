import esbuild from "esbuild";

try {
  await esbuild.build({
    entryPoints: ["./src/index.js"],
    outfile: "./dist/build.js",
    minify: true,
    bundle: true,
    format: "iife",
    target: ["esnext"],
  });

  console.log("Build successful!");
} catch (err) {
  console.error(err);
  process.exit(1);
}
