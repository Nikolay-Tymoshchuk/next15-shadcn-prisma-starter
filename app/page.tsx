import prisma from '@/lib/prisma';

export default async function HomePage() {
    const user = await prisma.user.findFirst({
        where: {
            email: 'test@test.com'
        }
    });

    return <main>Hello, {user?.name}</main>;
}
