import React from 'react';

export default function Page() {
	return (
		<div className='p-6 max-w-7xl mx-auto space-y-6 w-full'>
			{/* Header */}
			<div className='flex flex-col justify-between '>
				<h1 className='text-3xl font-bold'>General Account Settings</h1>
				<p className='text-sm text-muted-foreground'>
					Update your account settings. Set your preferred language and
					timezone.
				</p>
			</div>
		</div>
	);
}
