import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { Toaster } from 'sonner';
import { AppSidebar } from '../../components/app-sidebar';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Pill } from 'lucide-react';

const geistSans = localFont({
	src: '../fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: '../fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Sechaba Care',
	description:
		"Medication management system for Botswana's healthcare facilities.",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<header className='flex items-center justify-between border-b px-4 py-2 md:hidden'>
							<Link href='/' className='flex items-center'>
								<Pill className='w-8 h-8 text-blue-600' />
								<span className='ml-2 text-xl font-bold text-gray-800'>
									Sechaba Care
								</span>
							</Link>
							<SidebarTrigger className='' />
						</header>
						{children}
					</SidebarInset>
				</SidebarProvider>
				{/* <Toaster richColors /> */}
			</body>
		</html>
	);
}
