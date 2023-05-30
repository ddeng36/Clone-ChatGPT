"use client";
import React from "react";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import { useSession, signOut } from "next-auth/react";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "@firebase/firestore";
import ModelSelection from "./ModelSelection";
const Sidebar = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    // Clear user information from browser storage
    localStorage.clear();
    sessionStorage.clear();

    // Sign out the user
    signOut();
  };
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div className="flex h-screen flex-col p-2 ">
      <div className="flex-1">
        <div>
          <NewChat />
          <ModelSelection />
          <div>
          {loading && (
            <div className="animate-pulse text-center text-gray-100">
              <p>Loading Chats...</p>
            </div>
          )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <img
          onClick={() => {
            signOut();
          }}
          src={session?.user?.image!}
          alt="user profile"
          className="mx-auto my-2 h-16 w-16 cursor-pointer rounded-full
          hover:opacity-50"
        />
      )}
    </div>
  );
};

export default Sidebar;
