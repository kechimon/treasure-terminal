"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RoomPage() {

  const params = useParams();

  const roomName = decodeURIComponent(
    (params?.room as string) || ""
  );

  const [messages, setMessages] = useState<any[]>([]);

  const [input, setInput] = useState("");

  const [name, setName] = useState("名無し");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* LOAD */

  useEffect(() => {

    const saved = localStorage.getItem(roomName);

    if (saved) {

      setMessages(JSON.parse(saved));

    }

  }, [roomName]);

  /* SAVE */

  useEffect(() => {

    localStorage.setItem(
      roomName,
      JSON.stringify(messages)
    );

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, roomName]);

  /* SEND */

  const sendMessage = () => {

    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        user: name || "名無し",
        text: input,
      },
    ]);

    setInput("");

  };

  return (

    <main className="min-h-screen bg-[#05070b] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

      </div>

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-3xl">

        <div className="max-w-[1200px] mx-auto px-4 h-[74px] flex items-center justify-between">

          <div>

            <p className="text-[10px] tracking-[0.35em] text-gray-500 uppercase">
              TREASURE COMMUNITY
            </p>

            <h1 className="mt-1 text-2xl font-black">
              {roomName}
            </h1>

          </div>

          <Link
            href="/community"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 transition"
          >

            BACK

          </Link>

        </div>

      </header>

      {/* BODY */}

      <section className="relative z-10 max-w-[1000px] mx-auto px-4 py-8">

        <div className="rounded-[30px] border border-white/10 bg-black/40 backdrop-blur-3xl p-5 md:p-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[10px] tracking-[0.35em] text-gray-500 uppercase">
                Live Chat
              </p>

              <h2 className="mt-2 text-3xl font-black">

                {roomName}

              </h2>

            </div>

            <p className="text-sm text-emerald-400 animate-pulse">
              ● ONLINE
            </p>

          </div>

          {/* CHAT */}

          <div className="mt-8 space-y-4 max-h-[500px] overflow-y-auto pr-2">

            {messages.map((msg, index) => (

              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >

                <p className="text-sm font-bold text-sky-300">

                  {msg.user}

                </p>

                <p className="mt-2 text-sm leading-7 text-gray-300">

                  {msg.text}

                </p>

              </div>

            ))}

            <div ref={bottomRef} />

          </div>

          {/* NAME */}

          <div className="mt-8 mb-3">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前"
              className="w-[220px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-sky-400/40"
            />

          </div>

          {/* INPUT */}

          <div className="flex gap-3">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  sendMessage();

                }

              }}
              placeholder="コメントを書く..."
              className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-sky-400/40"
            />

            <button
              onClick={sendMessage}
              className="rounded-2xl bg-sky-400 px-5 py-3 text-black font-black hover:bg-sky-300 transition"
            >

              送信

            </button>

          </div>

        </div>

      </section>

    </main>

  );

}