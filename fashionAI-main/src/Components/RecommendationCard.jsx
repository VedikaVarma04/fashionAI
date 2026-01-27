export default function RecommendationCard({ item }) {
  return (
    <div className="glass w-full mb-4">
      <h3 className="font-bold text-xl">Issue</h3>
      <p>{item.issue}</p>
      <h3 className="font-bold text-xl mt-2">AI Recommendation</h3>
      <pre className="whitespace-pre-wrap">{item.ai_response}</pre>
    </div>
  );
}
