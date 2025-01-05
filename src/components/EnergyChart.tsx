import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface EnergyChartProps {
  hydro?: number;
  wind?: number;
  nuclear?: number;
  solar?: number;
  other_renewables?: number;
  oil?: number;
  gas?: number;
  coal?: number;
  biofuel?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-200 text-black">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const EnergyChart = ({ hydro, wind, nuclear, solar, other_renewables, oil, gas, coal, biofuel }: EnergyChartProps) => {
  const rawData = useMemo(() => [
    { name: "Solar", value: parseFloat((solar || 0).toFixed(1)), color: "#FFD700"},
    { name: "Wind", value: parseFloat((wind || 0).toFixed(1)), color: "#C2E4FD" },
    { name: "Hydro", value: parseFloat((hydro || 0).toFixed(1)), color: "#00A1E6" },
    { name: "Other Renewables", value: parseFloat((other_renewables || 0).toFixed(1)), color: "#8FBC8F" },
    { name: "Nuclear", value: parseFloat((nuclear || 0).toFixed(1)), color: "#AC8EF9"},
    { name: "Oil", value: parseFloat((oil || 0).toFixed(1)), color: "#969696" },
    { name: "Gas", value: parseFloat((gas || 0).toFixed(1)), color: "#5B7876" },
    { name: "Coal", value: parseFloat((coal || 0).toFixed(1)), color: "#7E5A15" },
    { name: "Biofuel", value: parseFloat((biofuel || 0).toFixed(1)), color: "#007C18" },
  ], [hydro, wind, nuclear, solar, other_renewables, oil, gas, coal, biofuel]);

  const groupedData = useMemo(() => rawData.reduce((acc, entry) => {
    if (entry.value > 0 && entry.value < 1) {
      const other = acc.find(item => item.name === "Other");
      if (other) {
        other.value = parseFloat((other.value + entry.value).toFixed(1));
      } else {
        acc.push({ name: "Other", value: parseFloat(entry.value.toFixed(1)), color: "#CCCCCC" });
      }
    } else {
      acc.push(entry);
    }
    return acc;
  }, []), [rawData]);

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={groupedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
          >
            {groupedData.map((entry, index) => (
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