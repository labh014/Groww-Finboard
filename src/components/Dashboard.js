"use client";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWidget } from './widgets';
import AddWidgetModal from './AddWidgetModal';

import { toggleTheme, initializeTheme } from '../store/themeSlice';
import { removeWidget, initializeWidgets, reorderWidgets } from '../store/dashboardSlice';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Dashboard() {
    return <DashboardContent />;
}

function SortableWidget({ item, remove }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const Widget = getWidget(item.type);

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative group transition-all duration-300 hover:-translate-y-1 touch-none">
            <button
               
                onPointerDown={(e) => e.stopPropagation()}   // Prevent drag when clicking remove
                onClick={() => remove(item.id)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-50 z-20 cursor-pointer"
                title="Remove"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="h-full">
                <Widget config={item.config} />
            </div>
        </div>
    );
}

function DashboardContent() {
    const dispatch = useDispatch();



    const theme = useSelector((state) => state.theme.value);
    const widgets = useSelector((state) => state.dashboard.widgets);

    const isDark = theme === 'dark';
    const [showModal, setShowModal] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // Hydration fix

    useEffect(() => {
        setIsMounted(true);
        dispatch(initializeTheme());
        dispatch(initializeWidgets());
    }, [dispatch]);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    const remove = (id) => {
        dispatch(removeWidget(id));
    };


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = widgets.findIndex((w) => w.id === active.id);
            const newIndex = widgets.findIndex((w) => w.id === over.id);

            const newOrder = arrayMove(widgets, oldIndex, newIndex);
            dispatch(reorderWidgets(newOrder));
        }
    };

    if (!isMounted) return null; // Avoid mismatch

    return (
        <div className={`min-h-screen p-8 font-sans transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <header className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
                <div>
                    <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>FinBoard</h1>
                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Your personal finance monitor</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleToggle}
                        className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all border ${isDark ? 'bg-slate-900 border-slate-800 text-yellow-400 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        {isDark ? 'Sun' : 'Moon'}
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className={`px-5 py-2.5 text-white rounded-lg shadow-lg hover:shadow-xl text-sm font-medium flex items-center gap-2 transition-all ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-black hover:bg-slate-800'}`}
                    >
                        <span>+</span> Add Data Widget
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={widgets.map(w => w.id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {widgets.length === 0 ? (
                                <div className="col-span-full flex flex-col items-center justify-center text-center py-24 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
                                    <h3 className="text-lg font-semibold text-slate-700">Display is Empty</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto mt-2 mb-6">Start monitoring stocks or crypto by adding your first widget.</p>
                                    <button onClick={() => setShowModal(true)} className="text-blue-600 font-medium hover:underline cursor-pointer">Create Widget</button>
                                </div>
                            ) : (
                                widgets.map(widget => (
                                    <SortableWidget key={widget.id} item={widget} remove={remove} />
                                ))
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            <AddWidgetModal
                visible={showModal}
                close={() => setShowModal(false)}
            />
        </div>
    );
}
