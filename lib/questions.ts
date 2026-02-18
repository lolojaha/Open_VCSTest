export const symptomClusters = [
  { cluster: "General", questions: ["Fatigue", "Weakness", "Aches", "Cramps"] },
  { cluster: "Pain", questions: ["Headache", "Abdominal pain", "Joint pain"] },
  { cluster: "Respiratory", questions: ["Sinus congestion", "Cough", "Shortness of breath"] },
  { cluster: "Eyes", questions: ["Blurred vision", "Tearing", "Red eyes"] },
  { cluster: "Cognitive", questions: ["Memory issues", "Difficulty concentrating", "Word finding"] },
  { cluster: "Mood", questions: ["Anxiety", "Mood swings", "Depression"] },
  { cluster: "Neurologic", questions: ["Numbness", "Tingling", "Light sensitivity"] },
  { cluster: "Sleep", questions: ["Insomnia", "Frequent waking", "Unrefreshing sleep"] },
  { cluster: "GI", questions: ["Diarrhea", "Bloating", "Loss of appetite"] },
  { cluster: "Temperature", questions: ["Night sweats", "Temperature dysregulation", "Excess thirst"] },
  { cluster: "Skin", questions: ["Rash", "Static shocks", "Hair changes"] },
  { cluster: "Hormonal", questions: ["Libido changes", "Menstrual irregularity", "Frequent urination"] },
  { cluster: "Immune", questions: ["Frequent infections", "Food sensitivity", "Chemical sensitivity"] },
] as const;

export const ALL_QUESTIONS = symptomClusters.flatMap((c) =>
  c.questions.map((question) => ({ cluster: c.cluster, question })),
);
