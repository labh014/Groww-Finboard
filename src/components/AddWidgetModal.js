"use client";

import { useState } from 'react';

export default function AddWidgetModal({ visible, close, add }) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('card');

    if (!visible) return null;

    const save = (e) => {
        e.preventDefault();

        const defaultConfig = {
            title: title || 'New Widget',

            value: type === 'card' ? '$0.00' : undefined,
            type: type === 'chart' ? 'Line' : undefined,
            headers: type === 'table' ? ['Column A', 'Column B'] : undefined
        };

        add({
            title,
            type,
            config: defaultConfig
        });

        setTitle('');
        setType('card');
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <h2 className="text-xl font-bold mb-4">Add New Widget</h2>

                <form onSubmit={save} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Widget Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Sales Overview"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Widget Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="card">Stat Card</option>
                            <option value="chart">Chart</option>
                            <option value="table">Table</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={close}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Widget
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
