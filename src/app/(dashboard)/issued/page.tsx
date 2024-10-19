'use client';
import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Search,
	Filter,
	AlertCircle,
	UserCheck,
	Clock,
	RefreshCcw,
} from 'lucide-react';

interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	lastVisit: string;
}

interface Prescription {
	id: string;
	patientId: string;
	patientName: string;
	medication: string;
	dosage: string;
	frequency: string;
	prescribedDate: string;
	lastFilled?: string;
	nextFillDate?: string;
	status: 'unfilled' | 'filled' | 'overdue' | 'expired' | 'pending';
	remainingRefills: number;
	instructions: string;
	pharmacy?: string;
	alerts?: string[];
}

const ProviderPrescriptionDashboard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [timeFrame, setTimeFrame] = useState('all');

	// Sample data
	const prescriptions: Prescription[] = [
		{
			id: '1',
			patientId: 'P001',
			patientName: 'John Smith',
			medication: 'Lisinopril',
			dosage: '10mg',
			frequency: 'Once daily',
			prescribedDate: '2024-10-15',
			lastFilled: '2024-10-16',
			nextFillDate: '2024-11-15',
			status: 'filled',
			remainingRefills: 2,
			instructions: 'Take with food',
			pharmacy: 'CVS Pharmacy',
			alerts: ['Patient reported side effects'],
		},
		{
			id: '2',
			patientId: 'P002',
			patientName: 'Sarah Johnson',
			medication: 'Metformin',
			dosage: '500mg',
			frequency: 'Twice daily',
			prescribedDate: '2024-10-10',
			nextFillDate: '2024-10-20',
			status: 'overdue',
			remainingRefills: 5,
			instructions: 'Take with meals',
			pharmacy: 'Walgreens',
		},
		{
			id: '3',
			patientId: 'P003',
			patientName: 'Michael Chen',
			medication: 'Alprazolam',
			dosage: '0.5mg',
			frequency: 'As needed',
			prescribedDate: '2024-10-18',
			status: 'pending',
			remainingRefills: 0,
			instructions: 'Max 3 times per day',
			pharmacy: 'RiteAid',
		},
	];

	const getStatusBadge = (status: Prescription['status']) => {
		const styles = {
			unfilled: 'bg-yellow-100 text-yellow-800',
			filled: 'bg-green-100 text-green-800',
			overdue: 'bg-red-100 text-red-800',
			expired: 'bg-gray-100 text-gray-800',
			pending: 'bg-blue-100 text-blue-800',
		};

		return (
			<Badge variant='outline' className={`${styles[status]} font-medium`}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		);
	};

	const filteredPrescriptions = prescriptions.filter((prescription) => {
		const matchesSearch =
			prescription.patientName
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			prescription.medication.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus =
			statusFilter === 'all' || prescription.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	const stats = {
		total: prescriptions.length,
		unfilled: prescriptions.filter((p) => p.status === 'unfilled').length,
		overdue: prescriptions.filter((p) => p.status === 'overdue').length,
		pendingRefills: prescriptions.filter((p) => p.remainingRefills === 0)
			.length,
	};

	return (
		<div className='p-6 max-w-7xl mx-auto space-y-6 w-full'>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-3xl font-bold'>Prescription Management</h1>
					<p className='text-sm text-muted-foreground'>
						Manage and monitor issued prescriptions and patient medication
						schedules
					</p>
				</div>
				<Button className='flex items-center gap-2'>
					<RefreshCcw className='h-4 w-4' />
					Refresh Data
				</Button>
			</div>

			{/* <div className='grid grid-cols-4 gap-4'>
				<Card>
					<CardContent className='pt-6'>
						<div className='text-2xl font-bold'>{stats.total}</div>
						<div className='text-sm text-gray-500'>
							Total Active Prescriptions
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='pt-6'>
						<div className='text-2xl font-bold text-yellow-600'>
							{stats.unfilled}
						</div>
						<div className='text-sm text-gray-500'>Unfilled Prescriptions</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='pt-6'>
						<div className='text-2xl font-bold text-red-600'>
							{stats.overdue}
						</div>
						<div className='text-sm text-gray-500'>Overdue Refills</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='pt-6'>
						<div className='text-2xl font-bold text-blue-600'>
							{stats.pendingRefills}
						</div>
						<div className='text-sm text-gray-500'>Pending Refill Requests</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardContent className='pt-6'>
					<div className='flex gap-4 items-center'>
						<div className='flex-1'>
							<div className='relative'>
								<Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
								<Input
									placeholder='Search by patient name or medication...'
									className='pl-8'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
						</div>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Filter by status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Status</SelectItem>
								<SelectItem value='unfilled'>Unfilled</SelectItem>
								<SelectItem value='filled'>Filled</SelectItem>
								<SelectItem value='overdue'>Overdue</SelectItem>
								<SelectItem value='expired'>Expired</SelectItem>
								<SelectItem value='pending'>Pending</SelectItem>
							</SelectContent>
						</Select>
						<Select value={timeFrame} onValueChange={setTimeFrame}>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Time frame' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Time</SelectItem>
								<SelectItem value='today'>Today</SelectItem>
								<SelectItem value='week'>This Week</SelectItem>
								<SelectItem value='month'>This Month</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Prescriptions</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Patient</TableHead>
								<TableHead>Medication</TableHead>
								<TableHead>Dosage & Frequency</TableHead>
								<TableHead>Prescribed Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Last Filled</TableHead>
								<TableHead>Next Fill Date</TableHead>
								<TableHead>Refills Left</TableHead>
								<TableHead>Alerts</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredPrescriptions.map((prescription) => (
								<TableRow key={prescription.id}>
									<TableCell>
										<div>
											<div className='font-medium'>
												{prescription.patientName}
											</div>
											<div className='text-sm text-gray-500'>
												ID: {prescription.patientId}
											</div>
										</div>
									</TableCell>
									<TableCell>{prescription.medication}</TableCell>
									<TableCell>
										<div>
											<div>{prescription.dosage}</div>
											<div className='text-sm text-gray-500'>
												{prescription.frequency}
											</div>
										</div>
									</TableCell>
									<TableCell>{prescription.prescribedDate}</TableCell>
									<TableCell>{getStatusBadge(prescription.status)}</TableCell>
									<TableCell>
										{prescription.lastFilled || 'Not filled'}
									</TableCell>
									<TableCell>{prescription.nextFillDate}</TableCell>
									<TableCell>
										<Badge
											variant={
												prescription.remainingRefills === 0
													? 'destructive'
													: 'default'
											}
										>
											{prescription.remainingRefills}
										</Badge>
									</TableCell>
									<TableCell>
										{prescription.alerts && prescription.alerts.length > 0 && (
											<AlertCircle className='h-5 w-5 text-red-500' />
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card> */}
		</div>
	);
};

export default ProviderPrescriptionDashboard;
