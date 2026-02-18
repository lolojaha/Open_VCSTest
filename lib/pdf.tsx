import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { FREQUENCIES, evaluateBiotoxinScreen, type RowScore } from "./vcs";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11 },
  title: { fontSize: 22, marginBottom: 8 },
  section: { marginBottom: 14 },
  tableRow: { flexDirection: "row", justifyContent: "space-between", borderBottom: "1 solid #ccc", paddingVertical: 4 },
});

export function ReportDoc({
  date,
  user,
  scores,
  symptomClusters,
}: {
  date: string;
  user: string;
  scores: RowScore[];
  symptomClusters: number;
}) {
  const evalResult = evaluateBiotoxinScreen(scores);
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>OpenVCS Report</Text>
        <Text style={styles.section}>Screening tool only – not diagnostic – consult a physician.</Text>
        <Text>Date: {date}</Text>
        <Text>User: {user}</Text>
        <View style={styles.section}>
          {FREQUENCIES.map((f) => (
            <View style={styles.tableRow} key={f.key}>
              <Text>{f.key} ({f.cpd} cpd)</Text>
              <Text>Level {scores.find((s) => s.frequency === f.key)?.lastCorrectLevel ?? 0}</Text>
            </View>
          ))}
        </View>
        <Text>Biotoxin Screen: {evalResult.passed ? "Negative / pass" : "Positive / fail"}</Text>
        <Text>C row: {evalResult.c}, D row: {evalResult.d}</Text>
        <Text>Symptom clusters positive: {symptomClusters} / 13</Text>
        <Text style={{ marginTop: 16 }}>
          Scientific references and methodology are in the OpenVCS README. OpenVCS is MIT licensed.
        </Text>
      </Page>
    </Document>
  );
}
