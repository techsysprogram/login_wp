import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
  return (
<div className="flex items-center justify-center min-h-screen">
  <div className="flex flex-col items-center w-full max-w-sm space-y-2">
    <label className="text-lg font-semibold">Se connecter</label>
    <Input type="email" placeholder="Email" className="w-full" />
    <Input type="password" placeholder="Password" className="w-full" />
    <Button type="submit" className="w-full">Subscribe</Button>
  </div>
</div>

  )
}
