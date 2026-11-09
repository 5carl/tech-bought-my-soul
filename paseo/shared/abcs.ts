import { z } from "zod";
import { MAX } from "./parse";

export { BLOCK_LINE, parseAbcs } from "./parse";

export const ABCS_KIND = "abcs";
export const abcsSchema = z.object({ options: z.array(z.string()).max(MAX) });
