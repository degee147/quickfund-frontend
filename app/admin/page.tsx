import LoanTable from '@/components/ui/LoanTable';
export default function AdminHomePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-gray-700">Manage loan applications and repayments here.</p>
            <p></p>
            <LoanTable isAdminView={true} />
        </div>
    );
}
