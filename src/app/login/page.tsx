import { sign } from "crypto";
import { login, signup, signOut } from "./actions";

export default function LoginPage() {
  return (
    <>
      <form className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input
          className="text-black p-2"
          id="email"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="text-black p-2"
          id="password"
          name="password"
          type="password"
          required
        />
        <button
          className="bg-[#DFD9D9] p-2 text-black rounded-sm mt-4"
          formAction={login}
        >
          Log in
        </button>
        <button
          className="bg-[#DFD9D9] p-2 text-black rounded-sm"
          formAction={signup}
        >
          Sign up
        </button>
      </form>
      <form>
        <button
          className="bg-[#DFD9D9] p-2 text-black rounded-sm"
          formAction={signOut}
        >
          Log Out
        </button>
      </form>
    </>
  );
}