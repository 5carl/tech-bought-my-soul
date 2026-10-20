import { type PluginTimelineItemProps, useAgent, usePaseo } from "@getpaseo/plugin/client";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { z } from "zod";
import type { abcsSchema } from "../shared/abcs";

export function AbcsRow({ agentId, item, theme, layout }: PluginTimelineItemProps<z.output<typeof abcsSchema>>) {
  const paseo = usePaseo();
  const status = useAgent(agentId, (agent) => agent.status);
  const [done, setDone] = useState(false);
  const styles = useMemo(
    () => ({
      row: { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 8, paddingVertical: layout.compact ? 6 : 8 },
      chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface1 },
      primary: { backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
      text: { color: theme.colors.foreground },
      primaryText: { color: theme.colors.accentForeground },
      muted: { color: theme.colors.foregroundMuted },
    }),
    [theme, layout.compact],
  );

  if (done) return null;
  const busy = status === "running" || status === "initializing";

  async function send(text: string) {
    setDone(true);
    try {
      await paseo.agents.ref(agentId).send(text);
    } catch {
      setDone(false);
    }
  }

  return (
    <View style={styles.row}>
      {item.data.options.map((option, i) => (
        <Pressable
          key={`${i}-${option}`}
          accessibilityRole="button"
          accessibilityLabel={`Send: ${option}`}
          disabled={busy}
          onPress={() => void send(option)}
          style={[styles.chip, i === 0 ? styles.primary : null, busy ? { opacity: 0.5 } : null]}
        >
          <Text style={i === 0 ? styles.primaryText : styles.text}>{option}</Text>
        </Pressable>
      ))}
      <Pressable accessibilityRole="button" accessibilityLabel="Dismiss suggestions" onPress={() => setDone(true)} style={styles.chip}>
        <Text style={styles.muted}>Dismiss</Text>
      </Pressable>
    </View>
  );
}
