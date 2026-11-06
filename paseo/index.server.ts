import type { PluginServerContext } from "@getpaseo/plugin/server";
import { ABCS_KIND, parseAbcs } from "./shared/abcs";

type Item = { type: string; text?: string };

export default function contribute(server: PluginServerContext) {
  return server.on("agent.turn_ended", async (event, { paseo }) => {
    if (event.outcome.kind !== "completed") return;
    const agent = paseo.agents.ref(event.agent.id);
    // Paseo 0.15+ always sends an empty event.timeline; fetch the tail instead.
    let items: readonly Item[] = event.timeline;
    if (items.length === 0) {
      const page = await (agent.timeline as any).refetch({ direction: "tail", limit: 20 });
      items = (page?.entries ?? []).map((e: { item: Item }) => e.item);
    }
    const last = [...items].reverse().find((item) => item.type === "assistant_message");
    if (!last?.text) return;
    const options = parseAbcs(last.text);
    if (options.length === 0) return;
    await agent.timeline.append({
      type: "plugin",
      id: `abcs-${event.turnId ?? Date.now()}`,
      kind: ABCS_KIND,
      version: 1,
      data: { options },
    });
  });
}
