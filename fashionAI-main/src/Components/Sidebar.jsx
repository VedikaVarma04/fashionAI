import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Sidebar() {
  return (
    <div className="hidden md:flex w-64 bg-white shadow-xl p-6 flex-col gap-6 h-screen fixed">
      <h1 className="text-3xl font-bold text-blue-600">FITLens</h1>

      <nav className="flex flex-col gap-4">
        <Link className="text-lg hover:text-blue-600" to="/dashboard">
          Dashboard
        </Link>
        <Link className="text-lg hover:text-blue-600" to="/history">
          History
        </Link>
        <button
          type="button"
          className="text-left text-lg hover:text-red-600"
          onClick={() => supabase.auth.signOut()}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
