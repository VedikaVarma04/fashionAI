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

  if (!user) return <p>Loading...</p>;

  async function handleImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (r) => setImageBase64(r.target.result.split(",")[1]);
    reader.readAsDataURL(file);
  }

  async function generateAI() {
    setResult("Generating...");

    const prompt = {
      contents: [{
        role: "user",
        parts: [
          { text: `Create a stylish outfit based on: ${issue}` }
        ]
      }]
    };

    if (imageBase64) {
      prompt.contents[0].parts.push({
        inline_data: { data: imageBase64, mime_type: "image/jpeg" }
      });
    }

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB2ihOXRQzlGDAZWp_2FS3lBtEJlCEdVck`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prompt),
      }
    );

    const data = await r.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    setResult(text);

    await supabase.from("recommendations").insert({
      user_id: user.id,
      issue,
      ai_response: text,
    });
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
          onChange={(e) => setIssue(e.target.value)}
        />

        <input type="file" className="mt-3" onChange={handleImage} />

        <button onClick={generateAI} className="btn mt-4">Get Recommendation</button>

        <div className="glass mt-4 whitespace-pre-wrap">{result}</div>
      </div>
    </div>
  );
}
