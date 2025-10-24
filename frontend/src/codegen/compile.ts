import "./init";
import { $typst } from "@myriaddreamin/typst.ts";

async function compile(
  mainContent: string,
): Promise<Uint8Array<ArrayBufferLike>> {
  const vector = await $typst.vector({ mainContent });
  if (vector === undefined) {
    throw new Error("Vector compile is undefined");
  }
  return vector;
}

/**
 * Compile Typst code to SVG.
 * @param typstCode - The complete Typst source code to compile
 * @returns SVG string
 */
export async function compileToSVG(typstCode: string): Promise<string> {
  const vectorData = await compile(typstCode);
  const svgData = await $typst.svg({ vectorData });
  return svgData;
}
