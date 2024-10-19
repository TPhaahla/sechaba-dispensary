'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pill } from 'lucide-react';
import { toast } from 'sonner';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const showAppMessage = () => {
		toast.warning("You're Early", {
			description: 'This application is not yet live.',
		});
	};

	return (
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
	);
};

export default Header;
