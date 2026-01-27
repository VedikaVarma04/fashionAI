import { useState } from "react";
import { supabase } from "../supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser() {
    let { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else nav("/dashboard");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="glass w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="input mt-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="btn w-full mt-4" onClick={loginUser}>Login</button>

        <p className="mt-3">
          No account? <Link className="text-blue-600" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
