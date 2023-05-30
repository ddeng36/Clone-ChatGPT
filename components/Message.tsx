import React from "react";
import { DocumentData } from "firebase/firestore";
type Props = {
  message: DocumentData;
};
const Message = ({ message }: Props) => {
    const isGpt = message.user._id === "ChatGPT";
  return (
    <div className={`py-5 text-white ${isGpt && "bg-[#434654]"}`}>
      <div className="mx-auto flex max-w-2xl space-x-5 px-10">
        <img src={message.user.avatar} alt="" className="h-8 w-8" />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
