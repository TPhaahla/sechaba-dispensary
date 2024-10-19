'use client';

import * as React from 'react';
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
	Pill,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Separator } from './ui/separator';

// This is sample data.
const data = {
	user: {
		name: 'demo',
		email: 'demo@sechabacare.com',
		avatar: '/avatars/demo.jpg',
	},
	teams: [
		{
			name: 'Doctor',
			logo: Pill,
		},
		{
			name: 'Pharmacy',
			logo: Pill,
		},
		{
			name: 'Patient',
			logo: Pill,
		},
	],
	navMain: [
		{
			title: 'Home',
			url: '',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'Dashboard',
					url: '/home',
				},
			],
		},
		{
			title: 'Prescriptions',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'Patients',
					url: '/patients',
				},
				{
					title: 'Issued Scripts',
					url: '/issued',
				},
			],
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'General',
					url: '/general',
				},
				{
					title: 'Notification',
					url: '/notification',
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<Link href='/' className='flex items-center'>
					<Pill className='w-8 h-8 text-blue-600' />
					<span className='ml-2 text-xl font-bold text-gray-800'>
						Sechaba Care
					</span>
				</Link>
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
