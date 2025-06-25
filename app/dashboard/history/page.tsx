export default function HistoryPage() {
    const loans = [
        { id: 1, amount: 20000, status: 'Approved', date: '2025-05-10' },
        { id: 2, amount: 15000, status: 'Pending', date: '2025-06-01' },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Loan History</h2>
            <table className="min-w-full bg-white shadow rounded">
                <thead>
                    <tr>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.id}>
                            <td className="p-2 border">₦{loan.amount}</td>
                            <td className="p-2 border">{loan.status}</td>
                            <td className="p-2 border">{loan.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
