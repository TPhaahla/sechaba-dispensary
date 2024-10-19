'use client';
import React from 'react';
import {
	LineChart,
	Line,
	PieChart,
	Pie,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from 'recharts';
import {
	AlertTriangle,
	Clock,
	Calendar,
	Pill,
	Users,
	Activity,
	ArrowUp,
	ArrowDown,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

const StatCard = ({
	title,
	value,
	icon,
	trend,
	trendValue,
}: {
	title: string;
	value: string;
	icon: any;
	trend: string;
	trendValue: string;
}) => (
	<Card>
		<CardContent className='pt-6'>
			<div className='flex items-center justify-between'>
				<div>
					<p className='text-sm font-medium text-muted-foreground'>{title}</p>
					<h3 className='text-2xl font-bold mt-2'>{value}</h3>
					{trend && (
						<div className='flex items-center mt-2'>
							{trend === 'up' ? (
								<ArrowUp className='w-4 h-4 text-green-500 mr-1' />
							) : (
								<ArrowDown className='w-4 h-4 text-red-500 mr-1' />
							)}
							<span
								className={`text-sm ${
									trend === 'up' ? 'text-green-500' : 'text-red-500'
								}`}
							>
								{trendValue}%
							</span>
						</div>
					)}
				</div>
				<div className='p-3 bg-secondary rounded-full'>{icon}</div>
			</div>
		</CardContent>
	</Card>
);

const medicationTrends = [
	{ month: 'Jan', prescriptions: 245, refills: 180, alerts: 12 },
	{ month: 'Feb', prescriptions: 280, refills: 220, alerts: 8 },
	{ month: 'Mar', prescriptions: 260, refills: 190, alerts: 15 },
	{ month: 'Apr', prescriptions: 290, refills: 240, alerts: 10 },
	{ month: 'May', prescriptions: 310, refills: 250, alerts: 7 },
	{ month: 'Jun', prescriptions: 285, refills: 210, alerts: 13 },
];

const medicationTypes = [
	{ name: 'Antibiotics', value: 30 },
	{ name: 'Pain', value: 25 },
	{ name: 'Cardiac', value: 20 },
	{ name: 'Respiratory', value: 15 },
	{ name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Page() {
	return (
		<div className='p-4 md:p-6 space-y-6 bg-background min-h-screen'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-3xl font-bold'>Medication Tracking Dashboard</h1>
					<p className='text-sm text-muted-foreground'>
						Monitor general activity and patient trends.
					</p>
				</div>
				<div className='flex items-center space-x-4'>
					<Button variant='outline' size='icon'>
						<Calendar className='w-5 h-5' />
					</Button>
					<Button>Generate Report</Button>
				</div>
			</div>

			{/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<StatCard
					title='Active Patients'
					value='1,284'
					icon={<Users className='w-6 h-6 text-primary' />}
					trend='up'
					trendValue='12'
				/>
				<StatCard
					title='Medications Tracked'
					value='3,567'
					icon={<Pill className='w-6 h-6 text-primary' />}
					trend='up'
					trendValue='8'
				/>
				<StatCard
					title='Pending Refills'
					value='42'
					icon={<Clock className='w-6 h-6 text-primary' />}
				/>
				<StatCard
					title='Active Alerts'
					value='7'
					icon={<AlertTriangle className='w-6 h-6 text-orange-500' />}
					trend='down'
					trendValue='25'
				/>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Medication Activity Trends</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='h-80'>
							<ResponsiveContainer width='100%' height='100%'>
								<LineChart data={medicationTrends}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='month' />
									<YAxis />
									<Tooltip />
									<Line
										type='monotone'
										dataKey='prescriptions'
										stroke='#0088FE'
										name='Prescriptions'
									/>
									<Line
										type='monotone'
										dataKey='refills'
										stroke='#00C49F'
										name='Refills'
									/>
									<Line
										type='monotone'
										dataKey='alerts'
										stroke='#FF8042'
										name='Alerts'
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Medication Distribution</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='h-80'>
							<ResponsiveContainer width='100%' height='100%'>
								<PieChart>
									<Pie
										data={medicationTypes}
										cx='50%'
										cy='50%'
										outerRadius={100}
										fill='#8884d8'
										dataKey='value'
										label={({ name, value }) => `${name}: ${value}%`}
									>
										{medicationTypes.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex items-center justify-between p-4 bg-secondary/50 rounded-lg'>
							<div className='flex items-center'>
								<Activity className='w-5 h-5 text-primary mr-3' />
								<div>
									<p className='font-medium'>Prescription Updated</p>
									<p className='text-sm text-muted-foreground'>
										Patient ID: 123456
									</p>
								</div>
							</div>
							<span className='text-sm text-muted-foreground'>2m ago</span>
						</div>
						<div className='flex items-center justify-between p-4 bg-secondary/50 rounded-lg'>
							<div className='flex items-center'>
								<Pill className='w-5 h-5 text-primary mr-3' />
								<div>
									<p className='font-medium'>New Medication Added</p>
									<p className='text-sm text-muted-foreground'>
										Patient ID: 789012
									</p>
								</div>
							</div>
							<span className='text-sm text-muted-foreground'>15m ago</span>
						</div>
						<div className='flex items-center justify-between p-4 bg-secondary/50 rounded-lg'>
							<div className='flex items-center'>
								<AlertTriangle className='w-5 h-5 text-orange-500 mr-3' />
								<div>
									<p className='font-medium'>Refill Alert</p>
									<p className='text-sm text-muted-foreground'>
										Patient ID: 345678
									</p>
								</div>
							</div>
							<span className='text-sm text-muted-foreground'>1h ago</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Critical Alerts</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<Alert variant='destructive'>
							<AlertTriangle className='w-5 h-5' />
							<AlertDescription>
								<p className='font-medium'>
									Potential Drug Interaction Detected
								</p>
								<p className='text-sm'>Patient ID: 234567 - Review Required</p>
							</AlertDescription>
						</Alert>
						<Alert variant='warning'>
							<Clock className='w-5 h-5' />
							<AlertDescription>
								<p className='font-medium'>Medication Stock Alert</p>
								<p className='text-sm'>Low inventory for Medication ID: 789</p>
							</AlertDescription>
						</Alert>
						<Alert>
							<AlertTriangle className='w-5 h-5' />
							<AlertDescription>
								<p className='font-medium'>Upcoming Prescription Expiry</p>
								<p className='text-sm'>3 prescriptions expiring in 7 days</p>
							</AlertDescription>
						</Alert>
					</CardContent>
				</Card>
			</div> */}
		</div>
	);
}
