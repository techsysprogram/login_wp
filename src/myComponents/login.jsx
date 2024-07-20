import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {

  function handleSubmit(e) {
    e.preventDefault()
    const fields = new FormData(e.target)
    const fieldEmail = fields.get('email')
    const fieldPassword = fields.get('password')
    console.log(fieldEmail)
    console.log(fieldPassword)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
        <form className="form flex flex-col items-center w-full max-w-sm space-y-2" onSubmit={handleSubmit}>
          <label className="text-lg font-semibold">Se connecter</label>
          <Input name='email' type="email" placeholder="Email" className="w-full" />
          <Input name='password' type="password" placeholder="Password" className="w-full" />
          <Button type="submit" className="w-full">Subscribe</Button>
        </form>
    </div>
  )
}