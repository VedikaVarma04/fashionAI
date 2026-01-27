import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-xl flex justify-around py-3">
      <Link to="/dashboard">🏠</Link>
      <Link to="/history">📜</Link>
      <button type="button" onClick={() => supabase.auth.signOut()}>
        🚪
      </button>
    </div>
  );
}
