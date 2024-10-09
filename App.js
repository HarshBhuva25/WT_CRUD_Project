import React, { useState } from 'react';

const App = () => {
    const [formData, setFormData] = useState({ amount: '', gstRate: '' });
    const [entries, setEntries] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const amount = parseFloat(formData.amount);
        const gstRate = parseFloat(formData.gstRate);
        const gstAmount = (amount * gstRate) / 100;
        const totalAmount = amount + gstAmount;

        const newEntry = {
            id: Date.now(),
            amount,
            gstRate,
            gstAmount,
            totalAmount,
        };

        setEntries([...entries, newEntry]);
        setFormData({ amount: '', gstRate: '' });
    };

    const handleDelete = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    return (
        <div>
            <h1>Profit and Loss Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="gstRate"
                    placeholder="GST Rate (%)"
                    value={formData.gstRate}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Entry</button>
            </form>

            <h2>Entries</h2>
            <table style={{border: "1px solid black"}}>
                <thead>
                    <tr style={{border:"1px solid black"}}>
                        <th style={{border:"1px solid black"}}>Amount</th>
                        <th style={{border:"1px solid black"}}>GST Rate (%)</th>
                        <th style={{border:"1px solid black"}}>GST Amount</th>
                        <th style={{border:"1px solid black"}}>Total Amount</th>
                        <th style={{border:"1px solid black"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(entry => (
                        <tr key={entry.id}>
                            <td style={{border:"1px solid black"}}>{entry.amount}</td>
                            <td style={{border:"1px solid black"}}>{entry.gstRate}</td>
                            <td style={{border:"1px solid black"}}>{entry.gstAmount.toFixed(2)}</td>
                            <td style={{border:"1px solid black"}}>{entry.totalAmount.toFixed(2)}</td>
                            <td style={{border:"1px solid black"}}>
                                <button onClick={() => handleDelete(entry.id)} style={{border:"1px solid black"}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;