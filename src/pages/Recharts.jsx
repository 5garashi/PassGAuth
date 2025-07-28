import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

// 曜日キーを使ったデータ構造
const rawData = [
  { key: "mon", uv: 400, pv: 2400, amt: 2400 },
  { key: "tue", uv: 300, pv: 2210, amt: 2290 },
  { key: "wed", uv: 200, pv: 2290, amt: 2000 },
  { key: "thu", uv: 278, pv: 2000, amt: 2181 },
  { key: "fri", uv: 189, pv: 2181, amt: 2500 },
];

function RechartsPage() {
  const { t } = useTranslation();

  // 翻訳済みのラベルを適用
  const localizedData = rawData.map((item) => ({
    ...item,
    name: t(`chart.labels.${item.key}`),
  }));

  return (
    <div style={{ width: "80%", height: 400 }}>
      <h2>{t("chart.title")}</h2>
      <ResponsiveContainer>
        <LineChart data={localizedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RechartsPage;
