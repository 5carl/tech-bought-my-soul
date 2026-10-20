import type { PluginClientContext } from "@getpaseo/plugin/client";
import { AbcsRow } from "./client/abcs-row";
import { ABCS_KIND, abcsSchema } from "./shared/abcs";

export default function contribute(client: PluginClientContext) {
  return client.addTimelineRenderer({ kind: ABCS_KIND, version: 1, schema: abcsSchema, Component: AbcsRow });
}
