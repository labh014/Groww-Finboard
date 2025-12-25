"use client";

import Card from './Card';
import Chart from './Chart';
import Table from './Table';

// --- Registry ---

const components = {
    card: Card,
    chart: Chart,
    table: Table,
};

export const getWidget = (type) => {
    return components[type] || (() => <div className="p-4 text-red-500">Unknown Widget Type: {type}</div>);
};
