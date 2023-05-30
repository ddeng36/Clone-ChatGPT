'use client'

import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";


const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };

  return (
    <div onClick={createNewChat} className="chatRow border border-gray-700">
      <PlusIcon className="h-4 w-4 flex-shrink-0"></PlusIcon>
      <p>New Chat</p>
    </div>
  );
};

export default NewChat;
