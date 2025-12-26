"use client";

import React, { useEffect, useState } from 'react';
import { getHistory } from '../../utils/api';
import { useSelector } from 'react-redux';

export default function Chart({ config }) {
    const isDark = useSelector((state) => state.theme.value === 'dark');
    const [data, setData] = useState([]);
    
    const [hoveredValue, setHoveredValue] = useState(null);

    useEffect(() => {
        if (config.symbol) {
            const fetchData = async () => {
                const history = await getHistory(config.symbol);
                setData(history);
            };


            fetchData();
            const intervalId = setInterval(fetchData, config.interval || 10000);

            return () => clearInterval(intervalId);
        }
    }, [config.symbol]);

    const latestPrice = data.length > 0 ? data[data.length - 1].value : 0;
    const displayPrice = hoveredValue !== null ? hoveredValue : latestPrice;

    return (
        <div
            className={`p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all h-80 flex flex-col ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
            onMouseLeave={() => setHoveredValue(null)}
        >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{config.title || 'Chart'}</h3>
                    {config.symbol && <span className={`text-xs font-semibold mt-1 block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{config.symbol}</span>}
                </div>
                {data.length > 0 && (
                    <div className="text-right">
                        <div className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} ${hoveredValue ? 'scale-110 transition-transform text-blue-500' : ''}`}>
                            ${displayPrice.toFixed(2)}
                        </div>
                        {hoveredValue && <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected</div>}
                    </div>
                )}
            </div>

            <div className="flex-1 w-full flex items-end justify-between gap-1 relative cursor-crosshair">
              
                {data.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                        <svg className="w-8 h-8 opacity-20 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span className="text-xs font-medium">{config.symbol ? 'Loading data...' : 'No Data Source'}</span>
                    </div>
                ) : (
                    data.map((item, i) => {
                        const min = Math.min(...data.map(d => d.value)) * 0.99;
                        const max = Math.max(...data.map(d => d.value)) * 1.01;
                        const heightPct = ((item.value - min) / (max - min)) * 100;
                        const isHovered = hoveredValue === item.value;

                        return (
                            <div
                                key={i}
                                className="flex-1 flex flex-col justify-end group relative h-full"
                                onMouseEnter={() => setHoveredValue(item.value)}
                            >
                                <div
                                    className={`w-full transition-all rounded-t-sm ${isHovered ? 'bg-blue-500 opacity-100' : 'bg-blue-400 opacity-60 group-hover:opacity-80'}`}
                                    style={{
                                        height: `${Math.max(heightPct, 5)}%`,
                                        borderTopLeftRadius: '4px',
                                        borderTopRightRadius: '4px'
                                    }}
                                ></div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
