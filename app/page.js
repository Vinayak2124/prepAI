"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, FileText, ClipboardList, Layers } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <header className="p-5 shadow-md flex justify-between items-center bg-slate-100">
        <div className="flex gap-2 items-center">
          <Image
            className="rounded-full"
            src="/logo2.png"
            alt="Prep-AI Logo"
            width={40}
            height={40}
          />
          <h2 className="font-bold text-2xl text-blue-900">Prep-AI</h2>
        </div>

        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <Link href="/dashboard">
            <Button className="border border-gray-400 rounded-xl hover:bg-blue-800 hover:scale-95 transition-all font-semibold text-lg bg-blue-700 text-white">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <section className="flex flex-col md:flex-row flex-1 items-center justify-between px-8 py-20 max-w-7xl mx-auto gap-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Empower Your Learning <br />
            with <span className="text-blue-700">Prep-AI</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Prep-AI is your smart study companion. Learn, test, and master any
            topic faster with AI-driven tools.
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-4 text-lg bg-blue-700 hover:bg-blue-800 transition">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/knowledge.jpg"
            alt="Learning Illustration"
            width={350}
            height={350}
            className="w-full h-auto rounded-full transition-transform duration-500 hover:scale-105 hover:rotate-2 hover:shadow-2xl"
          />
        </div>
      </section>

      <section className="px-8 py-20 bg-white">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
          Why Choose Prep-AI?
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Prep-AI combines intelligent algorithms with intuitive tools to
          supercharge your study sessions. Here’s what makes us different:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: BookOpen,
              title: "Unlimited Topics",
              desc: "Access study material on any topic you need, anytime, anywhere.",
            },
            {
              icon: FileText,
              title: "Well-Structured Notes",
              desc: "Save time with AI-generated notes that highlight what matters most.",
            },
            {
              icon: ClipboardList,
              title: "Quick Quizzes",
              desc: "Test your knowledge with instant feedback and smart question banks.",
            },
            {
              icon: Layers,
              title: "Smart Flashcards",
              desc: "Memorize key terms with spaced repetition for maximum retention.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-6 border rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
            >
              <item.icon className="w-10 h-10 text-blue-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-20 bg-slate-100">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Questions, feedback, or partnership ideas? Reach out below!
        </p>

        <form className="max-w-2xl mx-auto grid grid-cols-1 gap-6 bg-white p-8 rounded-xl shadow-md">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder=" "
              className="peer border-b-2 w-full py-3 placeholder-transparent focus:outline-none focus:border-blue-700"
            />
            <label className="absolute left-0 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-xs">
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder=" "
              className="peer border-b-2 w-full py-3 placeholder-transparent focus:outline-none focus:border-blue-700"
            />
            <label className="absolute left-0 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-xs">
              Email
            </label>
          </div>
          <div className="relative">
            <textarea
              name="message"
              rows="4"
              placeholder=" "
              className="peer border-b-2 w-full py-3 placeholder-transparent focus:outline-none focus:border-blue-700"
            ></textarea>
            <label className="absolute left-0 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-xs">
              Message
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800"
          >
            Send Message
          </Button>
          {/* Future: Confirmation message */}
          {/* <p className="text-green-600">Thank you! We'll get back to you soon.</p> */}
        </form>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 bg-slate-200 text-center text-gray-600">
        © {new Date().getFullYear()} Prep-AI. All rights reserved.
      </footer>
    </main>
  );
}
