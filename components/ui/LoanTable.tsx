'use client';

import { useEffect, useState } from 'react';
import API from '@/lib/axios';

interface Loan {
    id: number;
    amount: string;
    status: string;
    score: number | null;
    created_at: string;
    user?: {
        name: string;
        email: string;
    };
}

interface LoanTableProps {
    isAdminView?: boolean;
}

const LoanTable = ({ isAdminView = false }: LoanTableProps) => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
    // const { user } = useAuth();

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await API.get('/loans');
                setLoans(res.data as Loan[]);
            } catch (error) {
                console.error('Error fetching loans', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    const repayLoan = async (loanId: number) => {
        if (!confirm('Are you sure you want to repay this loan?')) return;

        try {
            await API.post(`/loans/${loanId}/repay`);
            setLoans(loans.map(loan =>
                loan.id === loanId ? { ...loan, status: 'repaid' } : loan
            ));
            alert('Loan repaid successfully.');
        } catch (error) {
            console.error('Repayment failed:', error);
            alert('Failed to repay loan.');
        }
    };

    const approveLoan = async (loanId: number) => {
        if (!confirm('Are you sure you want to approve this loan?')) return;

        try {
            await API.post(`/loans/${loanId}/approve`);
            setLoans(loans.map(loan =>
                loan.id === loanId ? { ...loan, status: 'approved' } : loan
            ));
            alert('Loan approved successfully.');
        } catch (error) {
            console.error('Approval failed:', error);
            alert('Failed to approve loan.');
        }
    };

    const rejectLoan = async (loanId: number) => {
        if (!confirm('Are you sure you want to reject this loan?')) return;

        try {
            await API.post(`/loans/${loanId}/reject`);
            setLoans(loans.map(loan =>
                loan.id === loanId ? { ...loan, status: 'rejected' } : loan
            ));
            alert('Loan rejected successfully.');
        } catch (error) {
            console.error('Rejection failed:', error);
            alert('Failed to reject loan.');
        }
    };

    if (loading) return <p>Loading loan history...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Loan History</h2>
            <table className="min-w-full bg-white shadow rounded text-sm">
                <thead>
                    <tr>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Status</th>
                        {isAdminView && <th className="p-2 border">Score</th>}
                        <th className="p-2 border">Date</th>
                        {isAdminView && <th className="p-2 border">User</th>}
                        <th className="p-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.id}>
                            <td className="p-2 border">
                                ₦{Number(loan.amount).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="p-2 border capitalize">{loan.status}</td>
                            {isAdminView && (
                                <td className="p-2 border">
                                    {loan.score !== null ? loan.score : <span className="text-gray-400">N/A</span>}
                                </td>
                            )}
                            <td className="p-2 border">{new Date(loan.created_at).toLocaleDateString()}</td>
                            {isAdminView && (
                                <td className="p-2 border">
                                    <div>
                                        <div className="font-semibold">{loan.user?.name}</div>
                                        <div className="text-xs text-gray-500">{loan.user?.email}</div>
                                    </div>
                                </td>
                            )}
                            <td className="p-2 border text-center">
                                {/* Admin Actions */}
                                {isAdminView ? (
                                    <>
                                        {loan.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => approveLoan(loan.id)}
                                                    className="text-green-600 underline hover:text-green-800 mr-2"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => rejectLoan(loan.id)}
                                                    className="text-red-600 underline hover:text-red-800"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {loan.status === 'approved' && (
                                            <button
                                                onClick={() => repayLoan(loan.id)}
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                Repay
                                            </button>
                                        )}
                                        {loan.status === 'rejected' && (
                                            <span className="text-gray-400">No actions</span>
                                        )}
                                        {loan.status === 'repaid' && (
                                            <span className="text-gray-400">Repaid</span>
                                        )}
                                    </>
                                ) : (
                                    // User Actions (non-admin)
                                    <>
                                        {loan.status === 'approved' && (
                                            <button
                                                onClick={() => repayLoan(loan.id)}
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                Repay
                                            </button>
                                        )}
                                        {(loan.status === 'pending' || loan.status === 'rejected') && (
                                            <span className="text-gray-400">No actions</span>
                                        )}
                                        {loan.status === 'repaid' && (
                                            <span className="text-gray-400">Repaid</span>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanTable;