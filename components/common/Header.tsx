'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import AuthModal from './AuthModal'
import useAuth from '@/hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const { session, logOut } = useAuth()

    return (
        <div className='border-b-[1px] py-3 bg-[#121212]'>
            <div className='flex justify-between max-w-7xl mx-auto items-center'>
                <div className='text-lg font-semibold'>NoteForge AI</div>

                <div>
                    {
                        session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className='flex gap-2 items-center outline-none cursor-pointer'>
                                    <Avatar>
                                        <AvatarImage src={session?.user?.identities?.[0]?.identity_data?.avatar_url ?? "https://avatars.githubusercontent.com/u/91189139?v=4"} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col items-start justify-start'>
                                        <span className='text-sm font-semibold'>{session?.user?.identities?.[0]?.identity_data?.name}</span>
                                        <span className='text-sm text-gray-500'> {session.user.email} </span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className=''>
                                    <DropdownMenuLabel> Hi {session?.user?.identities?.[0]?.identity_data?.name} </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer' onClick={logOut}>Log Out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className='flex items-center gap-4 text-sm'>
                                <Button variant={'outline'} className='cursor-pointer' onClick={() => setShowLoginModal(true)}>
                                    Login
                                </Button>
                                <Button className='cursor-pointer' onClick={() => setShowLoginModal(true)}>
                                    Create Account
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>

            {
                showLoginModal && (
                    <AuthModal setShowLoginModal={setShowLoginModal} />
                )
            }
        </div>
    )
}

export default Header