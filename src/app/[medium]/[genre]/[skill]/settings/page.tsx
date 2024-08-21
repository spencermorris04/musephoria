// app/[medium]/[genre]/[skill]/settings/page.tsx
import { Input } from "~/shadcn-components/ui/input"
import { Label } from "~/shadcn-components/ui/label"
import { Button } from "~/shadcn-components/ui/button"
import { Switch } from "~/shadcn-components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <form className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="notifications" />
          <Label htmlFor="notifications">Enable notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="darkMode" />
          <Label htmlFor="darkMode">Dark mode</Label>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}