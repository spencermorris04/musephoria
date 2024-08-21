// app/[medium]/[genre]/[skill]/league/page.tsx
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/shadcn-components/ui/dialog"
import { Button } from "~/shadcn-components/ui/button"

import { LeagueMember } from '~/types';

const leagueMembers: LeagueMember[] = [
  { id: 1, name: 'John Doe', points: 1000, avatar: '/placeholder.svg?height=50&width=50' },
  { id: 2, name: 'Jane Smith', points: 950, avatar: '/placeholder.svg?height=50&width=50' },
  // Add more members
]

export default function LeaguePage() {
    const [selectedMember, setSelectedMember] = useState<LeagueMember | null>(null);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your League</h2>
      <p className="mb-4">7 days left in the tournament</p>
      <ul className="space-y-2">
        {leagueMembers.map((member, index) => (
          <li key={member.id} className="flex items-center space-x-4 p-2 border rounded">
            <span className="font-bold">{index + 1}</span>
            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
            <span>{member.name}</span>
            <span className="ml-auto">{member.points} points</span>
            <Button onClick={() => setSelectedMember(member)}>View Profile</Button>
          </li>
        ))}
      </ul>
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMember?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex space-x-4">
            <Button>Add Friend</Button>
            <Button>Send Message</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}