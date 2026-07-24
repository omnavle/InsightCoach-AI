import { useEffect, useState } from "react";
import Header from "../components/Header";
import LessonNav from "../components/LessonNav";
import UploadSection from "../components/UploadSection";
import DatasetSummary from "../components/DatasetSummary";
import LessonSection from "../components/LessonSection";
import MentorPanel from "../components/MentorPanel";
import RecommendationPanel from "../components/RecommendationPanel";
import ChartPanel from "../components/ChartPanel";
import ChatPanel from "../components/ChatPanel";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import { useDataset } from "../hooks/useDataset";
import { getChartSuggestions, getDatasetOverview, getMLRecommendation } from "../services/api";
import type { ChartSuggestion, ChatMessage, DatasetOverview, MLRecommendation } from "../types";

export default function Home() {
  const { dataset, isUploading, error, upload } = useDataset();

  const [overview, setOverview] = useState<DatasetOverview | null>(null);
  const [recommendation, setRecommendation] = useState<MLRecommendation | null>(null);
  const [chartSuggestions, setChartSuggestions] = useState<ChartSuggestion[] | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [loadingLesson, setLoadingLesson] = useState<number | null>(null);

  useEffect(() => {
    if (!dataset) return;
    async function loadLesson1() {
      setLoadingLesson(1);
      const data = await getDatasetOverview(dataset!.id);
      setOverview(data);
      setLoadingLesson(null);
    }
    loadLesson1();
  }, [dataset]);

  useEffect(() => {
    if (!overview || !dataset) return;
    async function loadLesson2() {
      setLoadingLesson(2);
      const data = await getMLRecommendation(dataset!.id);
      setRecommendation(data);
      setLoadingLesson(null);
    }
    loadLesson2();
  }, [overview, dataset]);

  useEffect(() => {
    if (!recommendation || !dataset) return;
    async function loadLesson3() {
      setLoadingLesson(3);
      const data = await getChartSuggestions(dataset!.id);
      setChartSuggestions(data.slice(0, 3));
      setLoadingLesson(null);
    }
    loadLesson3();
  }, [recommendation, dataset]);

  const navItems = [
    { id: "lesson-1", number: "01", title: "Understand your dataset", unlocked: !!dataset },
    { id: "lesson-2", number: "02", title: "Machine learning coach", unlocked: !!overview },
    { id: "lesson-3", number: "03", title: "Visualization coach", unlocked: !!recommendation },
    { id: "lesson-4", number: "04", title: "Ask the mentor", unlocked: !!chartSuggestions },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid md:grid-cols-[180px_1fr] gap-10">
          <LessonNav items={navItems} />

          <div className="space-y-10 min-w-0">
            <UploadSection onUpload={upload} isUploading={isUploading} error={error} />

            {!dataset && !isUploading && (
              <EmptyState
                title="Upload a CSV to begin"
                description="InsightCoach reads your dataset and walks through it with you, one lesson at a time."
              />
            )}

            {dataset && <DatasetSummary dataset={dataset} />}

            {dataset && (
              <LessonSection
                number="01"
                title="Understand your dataset"
                subtitle="Shape, types, gaps, and what it's likely about."
                visible={true}
              >
                {loadingLesson === 1 || !overview ? <LoadingSkeleton lines={5} /> : <MentorPanel overview={overview} />}
              </LessonSection>
            )}

            {overview && (
              <LessonSection
                number="02"
                title="Machine learning coach"
                subtitle="What kind of problem this is, and how to prepare for it."
                visible={true}
              >
                {loadingLesson === 2 || !recommendation ? (
                  <LoadingSkeleton lines={5} />
                ) : (
                  <RecommendationPanel recommendation={recommendation} />
                )}
              </LessonSection>
            )}

            {recommendation && (
              <LessonSection
                number="03"
                title="Visualization coach"
                subtitle="Ask for the chart you want, in plain English."
                visible={true}
              >
                {loadingLesson === 3 || !chartSuggestions ? (
                  <LoadingSkeleton lines={5} />
                ) : (
                  <ChartPanel datasetId={dataset!.id} />
                )}
              </LessonSection>
            )}

            {chartSuggestions && dataset && (
              <LessonSection
                number="04"
                title="Ask the mentor"
                subtitle="Chat with your AI mentor about anything in this dataset."
                visible={true}
              >
                <ChatPanel
                  datasetId={dataset.id}
                  messages={chatMessages}
                  onMessagesChange={setChatMessages}
                />
              </LessonSection>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-line py-8 text-center font-mono text-xs text-ink-500">
        InsightCoach — Learn any dataset before building a model.
      </footer>
    </div>
  );
}
