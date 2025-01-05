import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GuessDistributionProps {
  guessesCounts: { guesses: number; count: number }[];
}

const GuessDistribution = ({ guessesCounts }: GuessDistributionProps) => {
  // Transform the data to separate successful guesses from failed attempts
  const transformedData = [
    ...guessesCounts.map(entry => ({
      ...entry,
      label: `${entry.guesses}`,
    })),
    {
      guesses: 6,
      count: guessesCounts[4]?.count || 0, // Use the count from 5 guesses that were incorrect
      label: 'Failed'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border p-2 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{`${payload[0].value} games`}</p>
          <p className="text-xs text-muted-foreground">
            {payload[0].payload.label === 'Failed' 
              ? 'incorrect guesses'
              : `in ${payload[0].payload.guesses} guesses`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={transformedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis 
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888888', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888888', fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar 
            dataKey="count" 
            radius={[4, 4, 0, 0]}
          >
            {
              transformedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.label === 'Failed' 
                    ? 'hsl(0, 70%, 65%)' // Red color for failed attempts
                    : `hsl(${280 + index * 20}, 70%, ${75 - index * 5}%)`}
                />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GuessDistribution;