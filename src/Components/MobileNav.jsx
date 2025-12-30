import { Link } from "react-router-dom";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-xl flex justify-around py-3">
      <Link to="/dashboard">🏠</Link>
      <Link to="/history">📜</Link>
      <a onClick={() => supabase.auth.signOut()}>🚪</a>
    </div>
  );
}
