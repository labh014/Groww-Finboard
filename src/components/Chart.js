"use client";

import React from 'react';

export default function Chart({ config }) {
    return (
        <div className="p-4 bg-white border rounded shadow-sm h-64 flex flex-col">
            <h3 className="text-gray-700 font-semibold mb-4">{config.title || 'Chart'}</h3>
            <div className="flex-1 bg-gray-50 border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-gray-400">
                [Chart: {config.type || 'Line'}]
            </div>
        </div>
    );
}
