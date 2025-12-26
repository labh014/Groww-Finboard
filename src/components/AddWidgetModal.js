"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget } from '../store/dashboardSlice';

export default function AddWidgetModal({ visible, close }) {
    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.theme.value === 'dark');

    const [title, setTitle] = useState('');
    const [type, setType] = useState('card');
    const [symbol, setSymbol] = useState('');
    const [interval, setInterval] = useState(10000);

    if (!visible) return null;

    const save = (e) => {
        e.preventDefault();

        const defaultConfig = {
            title: title || 'New Widget',
            symbol: symbol.toUpperCase(),
            value: 'Loading...',
            type: type === 'chart' ? 'Line' : undefined,
            headers: type === 'table' ? ['Column A', 'Column B'] : undefined,
            interval: Number(interval)
        };

        const newWidget = {
            id: Date.now().toString(),
            name: title,
            type,
            config: defaultConfig
        };

        dispatch(addWidget(newWidget));

        setTitle('');
        setType('card');
        setSymbol('');
        close();
    };

    const modalBg = isDark ? 'bg-slate-900/95 border-slate-700 text-white' : 'bg-white/95 border-white text-slate-800';
    const inputBg = isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-blue-500';
    const labelColor = isDark ? 'text-slate-400' : 'text-slate-500';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
            <div className={`p-8 rounded-2xl shadow-2xl w-full max-w-md border ${modalBg} transition-all duration-300 transform scale-100`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-extrabold tracking-tight">Add Widget</h2>
                    <button onClick={close} className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isDark ? 'hover:bg-white/10' : ''}`}>
                        <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <form onSubmit={save} className="flex flex-col gap-5">
                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${labelColor}`}>Widget Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full border px-4 py-3 rounded-xl outline-none transition-all font-medium ${inputBg}`}
                            placeholder="e.g. Bitcoin Tracker"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${labelColor}`}>Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className={`w-full border px-4 py-3 rounded-xl outline-none transition-all font-medium appearance-none ${inputBg}`}
                            >
                                <option value="card">Stat Card</option>
                                <option value="chart">Graph Chart</option>
                                <option value="table">Data Table</option>
                            </select>
                        </div>
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${labelColor}`}>Refresh</label>
                            <select
                                value={interval}
                                onChange={(e) => setInterval(e.target.value)}
                                className={`w-full border px-4 py-3 rounded-xl outline-none transition-all font-medium appearance-none ${inputBg}`}
                            >
                                <option value={10000}>10s (Live)</option>
                                <option value={30000}>30s</option>
                                <option value={60000}>1 Min</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${labelColor}`}>Symbol / Ticket</label>
                        <input
                            type="text"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            className={`w-full border px-4 py-3 rounded-xl outline-none transition-all font-medium ${inputBg}`}
                            placeholder="AAPL, BINANCE:BTCUSDT"
                            required
                        />
                        <p className={`text-[10px] mt-2 ${labelColor}`}>Supports Stocks (AAPL) and Crypto (BINANCE:BTCUSDT)</p>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-dashed border-slate-200/20">
                        <button
                            type="button"
                            onClick={close}
                            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg hover:shadow-blue-500/30 text-sm font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Create Widget
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
