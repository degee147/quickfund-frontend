import LoanTable from '@/components/ui/LoanTable';

export default function AdminLoansPage() {
    return (
        <div>
            {/* <h2 className="text-xl font-bold mb-4">Loan History</h2> */}
            <LoanTable isAdminView={true} />
        </div>
    );
}