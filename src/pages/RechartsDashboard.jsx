// src/pages/RechartsDashboard.jsx

import React from 'react';
import { useTranslation } from 'react-i18next'; 
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar,
  ComposedChart,
  ScatterChart, Scatter,
  Treemap,
  FunnelChart, Funnel, LabelList,
  Sankey,
  ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis
} from 'recharts';
import ChartCard from '../components/ChartCard';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const sampleData = [
  { name: 'A', uv: 400, pv: 240, amt: 240 },
  { name: 'B', uv: 300, pv: 456, amt: 240 },
  { name: 'C', uv: 300, pv: 139, amt: 240 },
  { name: 'D', uv: 200, pv: 980, amt: 240 },
];

const sankeyData = {
  nodes: [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
  ],
  links: [
    { source: 0, target: 1, value: 5 },
    { source: 1, target: 2, value: 3 },
  ]
};

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const treemapData = [
  { name: 'A', size: 400 },
  { name: 'B', size: 300 },
  { name: 'C', size: 300 },
  { name: 'D', size: 200 },
];

export default function RechartsDashboard() {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', padding: '20px' }}>
      <div
        style={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}
      >
        {t('charts.title')}
      </div>
      <ChartCard title="01. Line Chart">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={sampleData}>
            <XAxis dataKey="name" /><YAxis /><Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="02. Bar Chart">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sampleData}>
            <XAxis dataKey="name" /><YAxis /><Tooltip />
            <Bar dataKey="pv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="03. Area Chart">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={sampleData}>
            <XAxis dataKey="name" /><YAxis /><Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="04. Pie Chart">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={60}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="05. Radar Chart">
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart outerRadius={90} data={sampleData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Radar" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="06. Radial Bar Chart">
        <ResponsiveContainer width="100%" height={250}>
          <RadialBarChart innerRadius="10%" outerRadius="80%" data={pieData} startAngle={180} endAngle={0}>
            <RadialBar dataKey="value" background clockWise fill="#82ca9d" />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="07. Horizontal Bar Chart">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart layout="vertical" data={sampleData}>
            <XAxis type="number" /><YAxis type="category" dataKey="name" /><Tooltip />
            <Bar dataKey="uv" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="08. Composed Chart">
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={sampleData}>
            <XAxis dataKey="name" /><YAxis /><Tooltip />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="09. Scatter Chart">
        <ResponsiveContainer width="100%" height={200}>
          <ScatterChart>
            <XAxis type="number" dataKey="uv" /><YAxis type="number" dataKey="pv" /><Tooltip />
            <Scatter name="Data" data={sampleData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="10. Treemap Chart">
        <ResponsiveContainer width="100%" height={200}>
          <Treemap data={treemapData} dataKey="size" stroke="#fff" fill="#8884d8" />
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="11. Donut Chart">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="12. Semi Pie Chart">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} startAngle={180} endAngle={0} cx="50%" cy="50%" outerRadius={60} fill="#00C49F" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="13. Funnel Chart">
        <ResponsiveContainer width="100%" height={200}>
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={pieData} isAnimationActive>
              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="14. Sankey Chart">
        <ResponsiveContainer width="100%" height={200}>
          <Sankey width={300} height={200} data={sankeyData} nodePadding={20} />
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="15. Double Pie Chart">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" cx="30%" cy="50%" outerRadius={50} fill="#8884d8" />
            <Pie data={pieData} dataKey="value" cx="70%" cy="50%" innerRadius={40} outerRadius={60} fill="#82ca9d" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="16. Tiny Line Chart">
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={sampleData}>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="17. Tiny Bar Chart">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={sampleData}>
            <Bar dataKey="uv" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="18. Stacked Bar Chart">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sampleData}>
            <XAxis dataKey="name" /><YAxis /><Tooltip />
            <Bar dataKey="uv" stackId="a" fill="#8884d8" />
            <Bar dataKey="pv" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="19. Dual Axis LineChart">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={sampleData}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Line yAxisId="left" type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="20. Gauge Chart">
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart innerRadius="80%" outerRadius="100%" startAngle={180} endAngle={0} data={[{ name: 'Score', value: 75 }]}>
            <RadialBar minAngle={15} clockWise dataKey="value" fill="#FFBB28" />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}
