"use client";

import { create } from "zustand";
import { ALL_QUESTIONS } from "./questions";
import type { RowScore } from "./vcs";

type State = {
  demographics: { age: string; sex: string; distanceConfirmed: boolean; calibrationPxPerCm: number | null };
  scores: RowScore[];
  symptomAnswers: Record<string, boolean>;
  setDemographics: (d: State["demographics"]) => void;
  setScores: (scores: RowScore[]) => void;
  setSymptomAnswer: (q: string, v: boolean) => void;
  reset: () => void;
};

const baseAnswers = Object.fromEntries(ALL_QUESTIONS.map((q) => [q.question, false]));

export const useAppStore = create<State>((set) => ({
  demographics: { age: "", sex: "", distanceConfirmed: false, calibrationPxPerCm: null },
  scores: [],
  symptomAnswers: baseAnswers,
  setDemographics: (demographics) => set({ demographics }),
  setScores: (scores) => set({ scores }),
  setSymptomAnswer: (q, v) =>
    set((state) => ({ symptomAnswers: { ...state.symptomAnswers, [q]: v } })),
  reset: () => set({ demographics: { age: "", sex: "", distanceConfirmed: false, calibrationPxPerCm: null }, scores: [], symptomAnswers: baseAnswers }),
}));
