"use client"
import { useEffect } from 'react';
import ChatGpt4 from "./components/ChatGpt4";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session)
  console.log(status)
  console.log(session?.user)
  useEffect(() => {
    if (typeof window !== 'undefined' && status === "authenticated" && !session) {
      router.push('/auth');
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <div>
        Role: <span className="font-bold"> {session?.user?.role} </span>
        </div>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
      >
        Log Out
      </button>
      <ChatGpt4 />
    </div>
  );
}
