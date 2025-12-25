"use client";

import React from 'react';

export default function Table({ config }) {
    return (
        <div className="p-4 bg-white border rounded shadow-sm overflow-hidden">
            <h3 className="text-gray-700 font-semibold mb-3">{config.title || 'Table'}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {(config.headers || []).map((h, i) => (
                                <th key={i} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* Placeholder rows */}
                        <tr>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500" colSpan={config.headers?.length || 1}>No data yet</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
