"use client";

import React from 'react';

export default function Card({ config }) {
    return (
        <div className="p-4 bg-white border rounded shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">{config.title || 'Untitled'}</h3>
            <div className="mt-2 text-3xl font-bold text-gray-900">{config.value || '--'}</div>
            {config.subtext && <p className="mt-1 text-sm text-gray-400">{config.subtext}</p>}
        </div>
    );
}
