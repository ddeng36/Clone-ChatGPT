import React from 'react'
import Chat from '@/components/Chat'
import ChatInput from '@/components/ChatInput'
type Props={
  params:{
    id:string
  }
}

function ChatPage({params:{id}}:Props) {
  return (
    <div className=' flex flex-col min-h-[100vh]'>
      <div className='flex-1'><Chat chatId={id} /></div>
      <div ><ChatInput chatId={id} /></div>
    </div>
  )
}

export default ChatPage