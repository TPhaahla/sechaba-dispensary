'use client';
import React, { useState } from 'react';
import {
	Search,
	Filter,
	ChevronDown,
	MoreVertical,
	Edit,
	Trash,
	Eye,
	AlertTriangle,
	Pill,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

// Sample patient data remains the same

const patientsData = [
	{
		id: 'P-001',
		name: 'John Smith',
		age: 45,
		lastVisit: '2024-10-15',
		status: 'Active',
		medications: 3,
		alerts: 1,
		nextRefill: '2024-10-25',
		condition: 'Hypertension',
		adherence: 95,
	},
	{
		id: 'P-002',
		name: 'Sarah Johnson',
		age: 62,
		lastVisit: '2024-10-14',
		status: 'Review',
		medications: 5,
		alerts: 2,
		nextRefill: '2024-10-20',
		condition: 'Diabetes Type 2',
		adherence: 88,
	},
	{
		id: 'P-003',
		name: 'Michael Brown',
		age: 35,
		lastVisit: '2024-10-12',
		status: 'Active',
		medications: 2,
		alerts: 0,
		nextRefill: '2024-11-05',
		condition: 'Asthma',
		adherence: 92,
	},
	{
		id: 'P-004',
		name: 'Emily Davis',
		age: 28,
		lastVisit: '2024-10-10',
		status: 'Inactive',
		medications: 1,
		alerts: 0,
		nextRefill: '2024-11-15',
		condition: 'Anxiety',
		adherence: 85,
	},
	{
		id: 'P-005',
		name: 'Robert Wilson',
		age: 71,
		lastVisit: '2024-10-16',
		status: 'Critical',
		medications: 7,
		alerts: 3,
		nextRefill: '2024-10-19',
		condition: 'Heart Disease',
		adherence: 78,
	},
];

type PatientStatus = 'Active' | 'Review' | 'Inactive' | 'Critical';
type BadgeVariant = 'default' | 'outline' | 'secondary' | 'destructive';
interface PatientStatusBadgeProps {
	status: PatientStatus;
}

// Update variants to use only valid Badge variants
const statusVariants: Record<PatientStatus, BadgeVariant> = {
	Active: 'default', // Changed from 'success'
	Review: 'outline', // Changed from 'warning'
	Inactive: 'secondary',
	Critical: 'destructive',
};
// const statusVariants = {
// 	Active: 'success',
// 	Review: 'warning',
// 	Inactive: 'secondary',
// 	Critical: 'destructive',
// };

const PatientStatusBadge = ({ status }: PatientStatusBadgeProps) => (
	<Badge variant={statusVariants[status]}>{status}</Badge>
);

const PatientRow = ({ patient }: { patient: any }) => {
	return (
		<TableRow>
			<TableCell>
				<div>
					<div className='font-medium'>{patient.name}</div>
					<div className='text-sm text-muted-foreground'>ID: {patient.id}</div>
				</div>
			</TableCell>
			<TableCell>
				<PatientStatusBadge status={patient.status} />
			</TableCell>
			<TableCell>{patient.age}</TableCell>
			<TableCell>
				<div>{patient.condition}</div>
				<div className='text-sm text-muted-foreground'>
					Last visit: {patient.lastVisit}
				</div>
			</TableCell>
			<TableCell>
				<div className='flex items-center'>
					<Pill className='w-4 h-4 text-blue-500 mr-1' />
					<span>{patient.medications}</span>
					{patient.alerts > 0 && (
						<div className='ml-3 flex items-center text-destructive'>
							<AlertTriangle className='w-4 h-4 mr-1' />
							<span>{patient.alerts}</span>
						</div>
					)}
				</div>
			</TableCell>
			<TableCell>{patient.nextRefill}</TableCell>
			<TableCell>{patient.adherence}%</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon'>
							<MoreVertical className='w-4 h-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem>
							<Eye className='w-4 h-4 mr-2' />
							View Details
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Edit className='w-4 h-4 mr-2' />
							Edit Patient
						</DropdownMenuItem>
						<DropdownMenuItem className='text-destructive'>
							<Trash className='w-4 h-4 mr-2' />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

const PatientsPage = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className='p-6 max-w-7xl mx-auto space-y-6 w-full'>
			{/* Header */}
			<div className='flex flex-col justify-between '>
				<h1 className='text-3xl font-bold'>Patients</h1>
				<p className='text-sm text-muted-foreground'>
					Manage and monitor patient information and medication schedules
				</p>
			</div>

			{/* <div className='flex flex-col sm:flex-row justify-between gap-4'>
				<div className='relative flex-1'>
					<Input
						type='text'
						placeholder='Search patients...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='pl-10'
					/>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							<Filter className='h-4 w-4 mr-2' />
							Filters
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<div className='p-4 space-y-4'>
							<div className='space-y-2'>
								<label className='text-sm font-medium'>Status</label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder='Select status' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>All</SelectItem>
										<SelectItem value='active'>Active</SelectItem>
										<SelectItem value='review'>Review</SelectItem>
										<SelectItem value='inactive'>Inactive</SelectItem>
										<SelectItem value='critical'>Critical</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-medium'>Condition</label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder='Select condition' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>All</SelectItem>
										<SelectItem value='hypertension'>Hypertension</SelectItem>
										<SelectItem value='diabetes'>Diabetes</SelectItem>
										<SelectItem value='asthma'>Asthma</SelectItem>
										<SelectItem value='heart-disease'>Heart Disease</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button>Add Patient</Button>
			</div>

			<Card>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Patient</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Age</TableHead>
								<TableHead>Condition</TableHead>
								<TableHead>Medications</TableHead>
								<TableHead>Next Refill</TableHead>
								<TableHead>Adherence</TableHead>
								<TableHead className='w-[50px]'></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{patientsData.map((patient) => (
								<PatientRow key={patient.id} patient={patient} />
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card> */}
		</div>
	);
};

export default PatientsPage;
