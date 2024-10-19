'use client';
import { useState } from 'react';
import { Shield, Pill, Bell, Hospital, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import Header from '@/components/header';

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
			{/* HeaderNav */}
			<Header />
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
