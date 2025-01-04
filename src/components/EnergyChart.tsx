import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface EnergyChartProps {
  solar: number;
  wind: number;
  nuclear: number;
}

const EnergyChart = ({ solar, wind, nuclear }: EnergyChartProps) => {
  const data = [
    { name: "Solar", value: solar, color: "#FFD700" },
    { name: "Wind", value: wind, color: "#87CEEB" },
    { name: "Nuclear", value: nuclear, color: "#4CAF50" },
  ];

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;