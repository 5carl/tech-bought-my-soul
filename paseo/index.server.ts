import type { PluginServerContext } from "@getpaseo/plugin/server";
import { ABCS_KIND, parseAbcs } from "./shared/abcs";

export default function contribute(server: PluginServerContext) {
  return server.on("agent.turn_ended", async (event, { paseo }) => {
    if (event.outcome.kind !== "completed") return;
    const last = [...event.timeline].reverse().find((item) => item.type === "assistant_message");
    if (!last || last.type !== "assistant_message") return;
    const options = parseAbcs(last.text);
    if (options.length === 0) return;
    await paseo.agents.ref(event.agent.id).timeline.append({
      type: "plugin",
      id: `abcs-${event.turnId ?? Date.now()}`,
      kind: ABCS_KIND,
      version: 1,
      data: { options },
    });
  });
}
