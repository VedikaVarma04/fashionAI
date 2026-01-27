import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Sidebar from "../Components/Sidebar";
import MobileNav from "../Components/MobileNav";
import RecommendationCard from "../Components/RecommendationCard";
import useAuth from "../Hooks/UseAuth";

export default function History() {
  const user = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    loadHistory();
  }, [user]);

  async function loadHistory() {
    const { data } = await supabase
      .from("recommendations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setItems(data || []);
  }

  return (
    <div className="flex">
      <Sidebar />
      <MobileNav />
      <div className="md:ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">Your AI Fashion History</h1>

        {items.map((item) => (
          <RecommendationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
