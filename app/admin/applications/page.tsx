export default function ApplicationsPage() {
    const mockApplications = [
        { id: 1, name: 'John Doe', amount: 10000, status: 'Pending' },
        { id: 2, name: 'Jane Smith', amount: 15000, status: 'Approved' },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Loan Applications</h2>
            <table className="min-w-full bg-white shadow rounded">
                <thead>
                    <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockApplications.map(app => (
                        <tr key={app.id}>
                            <td className="p-2 border">{app.name}</td>
                            <td className="p-2 border">₦{app.amount}</td>
                            <td className="p-2 border">{app.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
