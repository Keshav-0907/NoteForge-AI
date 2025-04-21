'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import AuthModal from './AuthModal'

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)

    return (
        <div className='border-b-[1px] py-3'>
            <div className='flex justify-between max-w-7xl mx-auto items-center'>
                <div className='text-lg font-semibold'>NoteForge AI</div>

                <div className='flex items-center gap-4 text-sm'>
                    <Button variant={'outline'} className='cursor-pointer' onClick={() => setShowLoginModal(true)}>
                        Login
                    </Button>
                    <Button className='cursor-pointer' onClick={() => setShowLoginModal(true)}>
                        Create Account
                    </Button>
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