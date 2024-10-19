import React from 'react';

export default function Page() {
	return (
		<div className='p-6 max-w-7xl mx-auto space-y-6 w-full'>
			{/* Header */}
			<div className='flex flex-col justify-between '>
				<h1 className='text-3xl font-bold'>Notification Settings</h1>
				<p className='text-sm text-muted-foreground'>
					Configure how you receive notifications
				</p>
			</div>
		</div>
	);
}
