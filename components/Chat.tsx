"use client";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  chatId: string;
};
const Chat = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [messages, loading, status] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return <div className="flex-1 overflow-y-auto overflow-x-hidden">
    {messages?.empty && (
      <>
        <p className="text-center text-2xl mt-10 text-white">
          Type a prompt in below to get started!
        </p>
        <ArrowDownCircleIcon className="h-10 w-10 text-white mx-auto mt-5 animate-bounce" />
      </>
    )}
    {messages?.docs.map((message) => (
      <Message key={message.id} message={message.data()} /> ))}
  </div>;
};

export default Chat;
