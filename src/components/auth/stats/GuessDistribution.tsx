import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface GuessDistributionProps {
  guessesCounts: { guesses: number; count: number }[];
}

const GuessDistribution = ({ guessesCounts }: GuessDistributionProps) => {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={guessesCounts}>
          <XAxis dataKey="guesses" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GuessDistribution;