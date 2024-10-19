'use client';
import { useState } from 'react';
import { Shield, Pill, Bell, Hospital, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

interface FeatureCardProps {
	title: string;
	description: string;
	icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
	<div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
		<div className='flex items-center mb-4'>
			<div className='p-2 bg-blue-100 rounded-full'>{icon}</div>
		</div>
		<h3 className='text-xl font-semibold mb-2 text-gray-800'>{title}</h3>
		<p className='text-gray-600'>{description}</p>
	</div>
);

export default function Home() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const showAppMessage = () => {
		toast.warning("You're Early", {
			description: 'This application is not yet live.',
		});
	};

	const features = [
		{
			title: 'Medication Tracking',
			description:
				'Securely record and manage medication administration with comprehensive client history tracking.',
			icon: <Pill className='w-6 h-6 text-blue-600' />,
		},
		{
			title: 'Multi-Clinic Integration',
			description:
				'Seamlessly connect with multiple healthcare facilities to prevent medication duplication.',
			icon: <Hospital className='w-6 h-6 text-blue-600' />,
		},
		{
			title: 'Smart Alerts',
			description:
				'Receive real-time notifications for critical updates and required actions.',
			icon: <Bell className='w-6 h-6 text-blue-600' />,
		},
		{
			title: 'Role-Based Access',
			description:
				'Ensure data security with sophisticated role-based authentication systems.',
			icon: <Users className='w-6 h-6 text-blue-600' />,
		},
		{
			title: 'Secure API Endpoints',
			description:
				'Protected API endpoints and database functions for maximum security.',
			icon: <Shield className='w-6 h-6 text-blue-600' />,
		},
		{
			title: 'Data Protection',
			description:
				'Advanced security measures to protect sensitive patient information.',
			icon: <Lock className='w-6 h-6 text-blue-600' />,
		},
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Navigation */}
			<nav className='bg-white shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16'>
						<Link href='/' className='flex items-center'>
							<Pill className='w-8 h-8 text-blue-600' />
							<span className='ml-2 text-xl font-bold text-gray-800'>
								Sechaba Care
							</span>
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden md:flex items-center space-x-4'>
							<a href='#features' className='text-gray-600 hover:text-blue-600'>
								Features
							</a>
							<a href='#contact' className='text-gray-600 hover:text-blue-600'>
								Contact
							</a>
							<Button
								onClick={showAppMessage}
								className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
							>
								Login
							</Button>
						</div>

						{/* Mobile menu Button */}
						<div className='md:hidden flex items-center'>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-500 hover:bg-gray-100'
							>
								<span className='sr-only'>Open main menu</span>
								<svg
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d={
											isMenuOpen
												? 'M6 18L18 6M6 6l12 12'
												: 'M4 6h16M4 12h16M4 18h16'
										}
									/>
								</svg>
							</Button>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className='md:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							<a
								href='#features'
								className='block px-3 py-2 text-gray-600 hover:text-blue-600'
							>
								Features
							</a>
							<a
								href='#contact'
								className='block px-3 py-2 text-gray-600 hover:text-blue-600'
							>
								Contact
							</a>
							<Button
								onClick={showAppMessage}
								className='w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
							>
								Login
							</Button>
						</div>
					</div>
				)}
			</nav>

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold sm:text-5xl md:text-6xl'>
							Secure Medication Tracking System
						</h1>
						<p className='mt-6 text-xl text-blue-100 max-w-3xl mx-auto'>
							Streamline medication management in Botswana&apos;s healthcare
							facilities with our comprehensive tracking system.
						</p>
						<div className='mt-10'>
							<Button
								onClick={showAppMessage}
								size='lg'
								className='bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50'
							>
								Get Started
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div
				id='features'
				className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'
			>
				<h2 className='text-3xl font-bold text-center mb-12 text-gray-800'>
					Key Features
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<FeatureCard key={index} {...feature} />
					))}
				</div>
			</div>

			{/* Contact Section */}
			<div id='contact' className='bg-gray-100'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
					<div className='text-center'>
						<h2 className='text-3xl font-bold text-gray-800 mb-8'>
							Ready to Get Started?
						</h2>
						<p className='text-gray-600 mb-8'>
							Contact us to learn more about how we can help your healthcare
							facility.
						</p>
						<Button
							onClick={showAppMessage}
							size='lg'
							className='bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700'
						>
							Contact Us
						</Button>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className='bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					<div className='text-center text-gray-600'>
						<p>© 2024 Sechaba Care. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
