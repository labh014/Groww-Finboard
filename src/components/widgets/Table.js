"use client";

import React, { useEffect, useState } from 'react';
import { getPrice } from '../../utils/api';
import { useSelector } from 'react-redux';


export default function Table({ config }) {
    const isDark = useSelector((state) => state.theme.value === 'dark');
    const [data, setData] = useState(null);

    useEffect(() => {
        if (config.symbol) {
            const fetchData = async () => {
                const result = await getPrice(config.symbol);
                setData(result);
            };

            fetchData();
            const intervalId = setInterval(fetchData, config.interval || 10000);

            return () => clearInterval(intervalId);
        }
    }, [config.symbol]);

    if (!config.symbol) return <div className={`p-6 border rounded-2xl shadow-sm h-64 flex items-center justify-center text-sm font-medium ${isDark ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-white border-slate-100 text-slate-400'}`}>Select a Symbol</div>;
    

    if (!data) return <div className={`p-6 border rounded-2xl shadow-sm h-64 flex items-center justify-center text-sm font-medium ${isDark ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-white border-slate-100 text-slate-400'}`}>Loading Stats...</div>;

    return (
        <div className={`p-0 border rounded-2xl shadow-sm hover:shadow-md transition-all h-full overflow-hidden flex flex-col ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>

            <div className={`p-5 border-b flex justify-between items-center ${isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50/50 border-slate-50'}`}>
                <h3 className={`font-bold text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {config.title || 'Overview'} <span className={`font-normal ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{config.symbol}</span>
                </h3>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Live"></div>
            </div>


            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm text-left">
                    <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-50'}`}>
                        <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50/80'}`}>
                            <td className={`px-5 py-3 font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Current Price</td>
                            <td className={`px-5 py-3 font-bold text-right ${isDark ? 'text-white' : 'text-slate-900'}`}>${data.price}</td>
                        </tr>
                        <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50/80'}`}>
                            <td className={`px-5 py-3 font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Open Price</td>
                            <td className={`px-5 py-3 text-right font-medium ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>${data.open}</td>
                        </tr>
                        <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50/80'}`}>
                            <td className={`px-5 py-3 font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Day High</td>
                            <td className="px-5 py-3 text-green-600 text-right font-medium">${data.high}</td>
                        </tr>
                        <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50/80'}`}>
                            <td className={`px-5 py-3 font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Day Low</td>
                            <td className="px-5 py-3 text-red-600 text-right font-medium">${data.low}</td>
                        </tr>
                        <tr className="group hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-3 font-medium text-slate-500">Prev Close</td>
                            <td className="px-5 py-3 text-slate-400 text-right font-medium">${data.prev}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
