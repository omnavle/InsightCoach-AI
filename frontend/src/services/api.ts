import axios from "axios";
import type {
  ChartData,
  ChartSuggestion,
  ChatMessage,
  Dataset,
  DatasetOverview,
  MLRecommendation,
} from "../types";

const api = axios.create({
  baseURL: "/api",
});

export async function uploadDataset(file: File): Promise<Dataset> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.dataset;
}

export async function getDatasetOverview(datasetId: number): Promise<DatasetOverview> {
  const { data } = await api.get(`/dataset/${datasetId}/overview`);
  return data;
}

export async function getMLRecommendation(datasetId: number): Promise<MLRecommendation> {
  const { data } = await api.get(`/mentor/${datasetId}`);
  return data;
}

export async function getChartSuggestions(datasetId: number): Promise<ChartSuggestion[]> {
  const { data } = await api.get(`/charts/${datasetId}/suggestions`);
  return data;
}

export async function generateChart(
  datasetId: number,
  chartType: string,
  xColumn: string,
  yColumn?: string
): Promise<ChartData> {
  const { data } = await api.post(`/charts/${datasetId}/generate`, {
    chart_type: chartType,
    x_column: xColumn,
    y_column: yColumn ?? null,
  });
  return data;
}

export async function generateChartFromText(datasetId: number, request: string): Promise<ChartData> {
  const { data } = await api.post(`/charts/${datasetId}/from-text`, { request });
  return data;
}

export async function sendChatMessage(
  datasetId: number,
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const { data } = await api.post("/chat", {
    dataset_id: datasetId,
    message,
    history,
  });
  return data.reply;
}

export default api;
