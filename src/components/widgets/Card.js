"use client";

import React, { useEffect, useState } from 'react';
import { getPrice } from '../../utils/api';
import { useSelector } from 'react-redux';

export default function Card({ config }) {
    const isDark = useSelector((state) => state.theme.value === 'dark');
    const [data, setData] = useState({ price: '--', change: 0 });

    useEffect(() => {
        if (config.symbol) {
            const fetchData = async () => {
                const result = await getPrice(config.symbol);
                if (result) {
                    setData({
                        price: result.price,
                        change: result.change
                    });
                }
            };

            fetchData();
            fetchData();
            const intervalId = setInterval(fetchData, config.interval || 10000);
            return () => clearInterval(intervalId);
        }
    }, [config.symbol]);

    const isPositive = data.change >= 0;

    return (
        <div className={`p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{config.title || 'Untitled'}</h3>
                    {config.symbol && <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{config.symbol}</span>}
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                    <span className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {data.price === '--' ? '--' : '$' + data.price}
                    </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                    {data.price !== '--' && (
                        <span className={`text-sm font-semibold px-1.5 py-0.5 rounded ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {isPositive ? '+' : ''}{Math.abs(data.change).toFixed(2)}%
                        </span>
                    )}
                    <span className="text-xs text-slate-400">today</span>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wide">Live Updates</span>
            </div>
        </div>
    );
}
