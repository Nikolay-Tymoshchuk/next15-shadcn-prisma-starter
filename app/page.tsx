import Link from 'next/link';

import Logo from '~/public/svg/logo.svg';

import prisma from '@/lib/prisma';

export default async function HomePage() {
    const user = await prisma.user.findFirst({
        where: {
            email: 'test@test.com'
        }
    });

    return (
        <main>
            <div className='container flex min-h-screen flex-col items-center justify-center space-y-2'>
                <h1>
                    Hello, <b>{user?.name}</b>
                </h1>
                <div className='group inline-block'>
                    Welcome to my{' '}
                    <Link
                        href='/'
                        className='rounded-md p-2 transition-colors duration-300 ease-in-out group-hover:bg-gray-300'>
                        <Logo className='inline-block aspect-square w-4' /> site
                    </Link>
                </div>
            </div>
        </main>
    );
}
