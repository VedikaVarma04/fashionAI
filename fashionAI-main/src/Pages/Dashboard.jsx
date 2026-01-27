import { useState } from "react";
import { supabase } from "../supabase";
import Sidebar from "../Components/Sidebar";
import MobileNav from "../Components/MobileNav";
import RecommendationCard from "../Components/RecommendationCard";
import useAuth from "../Hooks/UseAuth";



export default function Dashboard() {
  const user = useAuth();
  const [issue, setIssue] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <p>Loading...</p>;

  async function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (r) => {
      const base64 = r.target?.result?.toString() || "";
      const [, data] = base64.split(",");
      setImageBase64(data || null);
    };
    reader.readAsDataURL(file);
  }

  async function generateAI() {
    if (!issue && !imageBase64) {
      setResult("Please describe your fashion problem or upload an image.");
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setResult("Gemini API key is not configured. Set VITE_GEMINI_API_KEY in your .env file.");
      return;
    }

    setLoading(true);
    setResult("Generating...");

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `You are a professional fashion stylist. Suggest a stylish outfit and styling tips based on this request: "${issue}". Respond in a friendly, structured way with bullet points.`,
          },
        ],
      },
    ];

    if (imageBase64) {
      contents[0].parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg",
        },
      });
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "The AI did not return any text. Please try again.";

      setResult(text);

      await supabase.from("recommendations").insert({
        user_id: user.id,
        issue,
        ai_response: text,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setResult("Something went wrong while generating your fashion recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <MobileNav />

      <div className="md:ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">AI Fashion Assistant</h1>

        <textarea
          className="w-full h-32 p-3 border rounded-md"
          placeholder="Describe your fashion problem..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <input type="file" className="mt-3" accept="image/*" onChange={handleImage} />

        <button onClick={generateAI} className="btn mt-4" disabled={loading}>
          {loading ? "Generating..." : "Get Recommendation"}
        </button>

        <div className="glass mt-4 whitespace-pre-wrap min-h-[4rem]">
          {result}
        </div>
      </div>
    </div>
  );
}
