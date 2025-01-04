import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface EnergyChartProps {
  Hydro?: number;
  Wind?: number;
  Nuclear?: number;
  Solar?: number;
  Other_renewables?: number;
  Oil?: number;
  Gas?: number;
  Coal?: number;
  Biofuel?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const EnergyChart = ({ solar, wind, hydro, other_renewables, nuclear, oil, gas, coal, biofuel }: EnergyChartProps) => {
  const data = [
    { name: "Solar", value: solar || 0, color: "#FFD700"},
    { name: "Wind", value: wind || 0, color: "#D3E4FD" },
    { name: "Hydro", value: hydro || 0, color: "#00CED1" },
    { name: "Other Renewables", value: other_renewables || 0, color: "#8FBC8F" },
    { name: "Nuclear", value: nuclear || 0, color: "#E5DEFF"},
    { name: "Oil", value: oil || 0, color: "#252252" },
    { name: "Gas", value: gas || 0, color: "#5B7876" },
    { name: "Coal", value: coal || 0, color: "#292929" },
    { name: "Biofuel", value: biofuel || 0, color: "#806626" },
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
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="transition-all duration-200 hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;