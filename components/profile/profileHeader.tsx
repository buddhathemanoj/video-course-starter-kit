import React from "react"
import { Settings, LogOut, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
type ProfileDropdownProps = {
  name?: string
  email?: string
  avatarUrl?: string
  onManageAccount: () => void
  onSignOut: () => void
  onAddAccount: () => void
}
export default function ProfileDropdown({
  name = "",
  email = "",
  avatarUrl = "",
  onManageAccount,
  onSignOut,
  onAddAccount
}: ProfileDropdownProps) {
  const initials = name ? name.charAt(0).toUpperCase() : "?"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={name || "User avatar"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center p-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={avatarUrl} alt={name || "User avatar"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{name || "Anonymous User"}</p>
            <p className="text-xs text-muted-foreground">{email || "No email provided"}</p>
          </div>
        </div>
        <div className="p-2 flex justify-between">
          <Button variant="outline" className="w-[48%]" onClick={onManageAccount}>
            <Settings className="mr-2 h-4 w-4" />
            Manage account
          </Button>
          <Button variant="outline" className="w-[48%]" onClick={onSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
        <DropdownMenuItem className="p-2 focus:bg-transparent" onSelect={onAddAccount}>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center mr-2">
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <span>Add account</span>
          </div>
        </DropdownMenuItem>
        <hr/>
        <div className="p-2 text-xs text-center text-muted-foreground">
          Secured by Cognito
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}