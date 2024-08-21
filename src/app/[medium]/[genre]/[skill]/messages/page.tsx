// app/[medium]/[genre]/[skill]/messages/page.tsx
'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "~/shadcn-components/ui/avatar"
import { Input } from "~/shadcn-components/ui/input"
import { Button } from "~/shadcn-components/ui/button"

const messages = [
  { id: 1, sender: 'John Doe', content: 'Hey, how are you?', timestamp: '2023-06-01 10:00', isSelf: false },
  { id: 2, sender: 'You', content: 'I am doing great thanks', timestamp: '2023-06-01 10:05', isSelf: true },
  // Add more messages
]

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    // Logic to send message
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs ${message.isSelf ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg p-3`}>
              <p>{message.content}</p>
              <div className={`text-xs mt-1 ${message.isSelf ? 'text-blue-200' : 'text-gray-500'}`}>
                {message.isSelf ? 'You' : message.sender} - {message.timestamp}
              </div>
            </div>
            {!message.isSelf && (
              <Avatar className="w-8 h-8 ml-2">
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex">
        <Input 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
          className="flex-1 mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}