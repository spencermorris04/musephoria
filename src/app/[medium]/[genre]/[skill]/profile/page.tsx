// app/[medium]/[genre]/[skill]/profile/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from "~/shadcn-components/ui/avatar"
import { Button } from "~/shadcn-components/ui/button"

export default function ProfilePage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-20 h-20">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-600">@johndoe</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">About</h3>
        <p>Passionate musician and songwriter with 5 years of experience in indie rock.</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Guitar</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Vocals</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Songwriting</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Recent Projects</h3>
        <ul className="list-disc list-inside">
          <li>Summer Nights (Single)</li>
          <li>Echoes of Yesterday (EP)</li>
        </ul>
      </div>
      <Button>Edit Profile</Button>
    </div>
  )
}