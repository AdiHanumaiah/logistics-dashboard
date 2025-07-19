'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white">
            <h1 className="text-xl font-semibold">Logistics Dashboard</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-medium">Jane Admin</span>
                            <span className="text-xs text-muted-foreground">admin@example.com</span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
