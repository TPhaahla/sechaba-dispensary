'use client';
import React from 'react';
import { useState } from 'react';
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
import { Bell, CalendarClock, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Types
type PrescriptionStatus = 'pending' | 'filled' | 'due' | 'expired';

interface Prescription {
	id: string;
	medication: string;
	dosage: string;
	frequency: string;
	prescribedDate: string;
	nextFillDate: string;
	status: PrescriptionStatus;
	pharmacy: string;
	prescribedBy: string;
	clinic: string;
	lastFilled?: string;
	remainingRefills: number;
}

const PrescriptionPage = () => {
	const [prescriptions] = useState<Prescription[]>([
		{
			id: '1',
			medication: 'Lisinopril',
			dosage: '10mg',
			frequency: 'Once daily',
			prescribedDate: '2024-10-15',
			nextFillDate: '2024-10-25',
			status: 'due',
			pharmacy: 'CVS Pharmacy',
			prescribedBy: 'Dr. Sarah Johnson',
			clinic: 'Primary Care Clinic',
			lastFilled: '2024-09-25',
			remainingRefills: 2,
		},
		{
			id: '2',
			medication: 'Metformin',
			dosage: '500mg',
			frequency: 'Twice daily',
			prescribedDate: '2024-10-10',
			nextFillDate: '2024-11-10',
			status: 'filled',
			pharmacy: 'Walgreens',
			prescribedBy: 'Dr. Michael Chen',
			clinic: 'Diabetes Care Center',
			lastFilled: '2024-10-10',
			remainingRefills: 5,
		},
		{
			id: '3',
			medication: 'Alprazolam',
			dosage: '0.5mg',
			frequency: 'As needed',
			prescribedDate: '2024-10-18',
			nextFillDate: '2024-10-19',
			status: 'pending',
			pharmacy: 'RiteAid',
			prescribedBy: 'Dr. Emily Wilson',
			clinic: 'Mental Health Clinic',
			remainingRefills: 0,
		},
	]);

	const getStatusBadge = (status: PrescriptionStatus) => {
		const styles = {
			pending: 'bg-yellow-100 text-yellow-800',
			filled: 'bg-green-100 text-green-800',
			due: 'bg-blue-100 text-blue-800',
			expired: 'bg-red-100 text-red-800',
		};

		return (
			<Badge variant='outline' className={`${styles[status]} font-medium`}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		);
	};

	const getDueAlert = () => {
		const duePrescriptions = prescriptions.filter((p) => p.status === 'due');
		if (duePrescriptions.length > 0) {
			return (
				<Alert className='mb-6'>
					<AlertTriangle className='h-4 w-4' />
					<AlertTitle>Attention Required</AlertTitle>
					<AlertDescription>
						You have {duePrescriptions.length} prescription(s) due for refill.
					</AlertDescription>
				</Alert>
			);
		}
		return null;
	};

	return (
		<div className='p-6 max-w-7xl mx-auto space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Prescriptions</h1>
				<div className='flex gap-2'>
					<Bell className='h-6 w-6 text-gray-500' />
					<CalendarClock className='h-6 w-6 text-gray-500' />
				</div>
			</div>

			{getDueAlert()}

			<Card>
				<CardHeader>
					<CardTitle>Active Prescriptions</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Medication</TableHead>
								<TableHead>Dosage</TableHead>
								<TableHead>Frequency</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Next Fill Date</TableHead>
								<TableHead>Pharmacy</TableHead>
								<TableHead>Prescribed By</TableHead>
								<TableHead>Refills Left</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{prescriptions.map((prescription) => (
								<TableRow key={prescription.id}>
									<TableCell className='font-medium'>
										{prescription.medication}
									</TableCell>
									<TableCell>{prescription.dosage}</TableCell>
									<TableCell>{prescription.frequency}</TableCell>
									<TableCell>{getStatusBadge(prescription.status)}</TableCell>
									<TableCell>{prescription.nextFillDate}</TableCell>
									<TableCell>{prescription.pharmacy}</TableCell>
									<TableCell>
										<div>
											<div>{prescription.prescribedBy}</div>
											<div className='text-sm text-gray-500'>
												{prescription.clinic}
											</div>
										</div>
									</TableCell>
									<TableCell>{prescription.remainingRefills}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default PrescriptionPage;
