import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { query, collection, orderBy, deleteDoc, doc } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
type Props = {
  id: string;
};
const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async()=>{
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  }
  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5 " />
      <p className="hidden flex-1 truncate md:inline-flex">{messages?.docs.at(-1)?.data().text || `New Chat`}</p>
      <TrashIcon className="h-5 w-5 text-gray-700 hover:text-red-700" onClick={removeChat}/>
    </Link>
  );
};

export default ChatRow;
