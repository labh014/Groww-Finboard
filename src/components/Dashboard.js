"use client";

import { useState } from 'react';
import { getWidget } from './widgets';

export default function Dashboard() {
    const [widgets, setWidgets] = useState([
        {
            id: '1',
            name: 'Total Balance',
            type: 'card',
            config: { title: 'Total Balance', value: '$12,450.00', subtext: '+2.5% from last month' }
        },
        {
            id: '2',
            name: 'Revenue Trend',
            type: 'chart',
            config: { title: 'Revenue Trend', type: 'Line' }
        },
        {
            id: '3',
            name: 'Recent Transactions',
            type: 'table',
            config: { title: 'Recent Transactions', headers: ['Date', 'Merchant', 'Amount'] }
        }
    ]);

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">My Finance Dashboard</h1>
                {/* Placeholder for Add Widget button */}
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                    + Add Widget
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {widgets.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-20 border-2 border-dashed border-gray-300 rounded-lg">
                        No widgets yet. Add one to get started.
                    </div>
                ) : (
                    widgets.map(widget => {
                        const Widget = getWidget(widget.type);
                        return (
                            <div key={widget.id} className="relative group">
                                <Widget config={widget.config} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
