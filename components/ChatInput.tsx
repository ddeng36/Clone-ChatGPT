"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import queryOpenai from "@/lib/queryOpenai";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
type Props = {
  chatId: string;
};
const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const { data: model} = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    const reqMessage: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      reqMessage
    );
    const notification = toast.loading("ChatGPT is thinking...");

    const response = await queryOpenai(prompt, chatId, model);
    console.log(response);
    const resMessage: Message = {
      text: response || "ChatGPT was unable to find an answer for that!",
      createdAt: serverTimestamp(),
      user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar: "https://links.papareact.com/89k",
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      resMessage
    );
    toast.success("ChatGPT has responded!", {
      id: notification,
    });

  };
  return (
    <div className="rounded-lg bg-gray-700/50 text-sm text-gray-400">
      <form className=" flex space-x-5 p-5 " onSubmit={sendMessage}>
        {/* input's height would increase when row's of text is increasing */}
        <input
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          disabled={!session}
          type="text"
          placeholder="Type your message here..."
          className="flex-1 bg-transparent focus:outline-none 
          disabled:cursor-not-allowed disabled:text-gray-300 "
        />
        <button
          disabled={!session || !prompt}
          type="submit"
          className="rounded bg-[#11A37F] px-4 py-2 font-bold
           text-white hover:opacity-50 disabled:cursor-not-allowed 
           disabled:opacity-50 "
        >

          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="md:hidden">
        <ModelSelection/>
      </div>
    </div>
  );
};

export default ChatInput;
