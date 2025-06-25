export default function RepaymentsPage() {
    const repayments = [
        { id: 1, user: 'John Doe', amount: 5000, date: '2025-06-10' },
        { id: 2, user: 'Jane Smith', amount: 15000, date: '2025-06-20' },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Repayment Logs</h2>
            <table className="min-w-full bg-white shadow rounded">
                <thead>
                    <tr>
                        <th className="p-2 border">User</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {repayments.map(rep => (
                        <tr key={rep.id}>
                            <td className="p-2 border">{rep.user}</td>
                            <td className="p-2 border">₦{rep.amount}</td>
                            <td className="p-2 border">{rep.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
