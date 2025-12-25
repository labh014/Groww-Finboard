"use client";

import { useState } from 'react';
import { getWidget } from './widgets';
import AddWidgetModal from './AddWidgetModal';

export default function Dashboard() {
    const [widgets, setWidgets] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const add = ({ title, type, config }) => {
        const newWidget = {
            id: Date.now().toString(),     // easy way to generate unique id
            name: title,
            type,
            config
        };


        console.log("New Widget:", newWidget);

        setWidgets([...widgets, newWidget]);
    };

    const remove = (id) => {
        setWidgets(widgets.filter(w => w.id !== id));
    };

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">My Finance Dashboard</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    + Add Widget
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {widgets.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-20 border-2 border-dashed border-gray-300 rounded-lg">
                        No widgets Added. Add your first widget.
                    </div>
                )

                    :

                    (
                        widgets.map(widget => {
                            const Widget = getWidget(widget.type);

                            return (
                                <div key={widget.id} className="relative group">

                                    {/* Only show on hover */}
                                    <button
                                        onClick={() => remove(widget.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                                        title="Remove Widget"
                                    >


                                        &times;
                                    </button>
                                    <Widget config={widget.config} />
                                </div>
                            );
                        })
                    )}
            </div>

            <AddWidgetModal
                visible={showModal}
                close={() => setShowModal(false)}
                add={add}
            />
        </div>
    );
}
