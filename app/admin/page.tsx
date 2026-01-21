'use client';

import React, { useState, useEffect } from 'react';
import { FeedbackService } from '@/lib/feedback-service';
import DashboardCharts from '@/components/admin/DashboardCharts';
import FeedbackTable from '@/components/admin/FeedbackTable';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [configUrl, setConfigUrl] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [data, setData] = useState<any>({ demographics: [], aiFeedback: [], applicability: [] });

    // Stats are derived from data
    const stats = {
        demographics: data.demographics ? data.demographics.length : 0,
        aiFeedback: data.aiFeedback ? data.aiFeedback.length : 0,
        applicability: data.applicability ? data.applicability.length : 0
    };

    useEffect(() => {
        // Check if session is authenticated (simple check)
        const storedAuth = sessionStorage.getItem('ncs_admin_auth');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            loadConfig();
            loadStats();
        }
    }, []);

    const loadConfig = () => {
        setConfigUrl(FeedbackService.getGASUrl());
    };

    const loadStats = () => {
        const loadedData = FeedbackService.exportAllData();
        setData(loadedData);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded password for client-side demo
        // In production, use real auth
        if (password === 'admin' || password === 'ncs2026') {
            setIsAuthenticated(true);
            sessionStorage.setItem('ncs_admin_auth', 'true');
            loadConfig();
            loadStats();
        } else {
            alert('Sai mật khẩu!');
        }
    };

    const handleSaveConfig = () => {
        FeedbackService.setGASUrl(configUrl);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('ncs_admin_auth');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center pt-20">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter admin password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Configuration Section */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Google Sheets Configuration</h2>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-red-500 hover:text-red-700"
                    >
                        Sign Out
                    </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Paste the "Web App URL" from your Google Apps Script deployment here to enable cloud sync.
                </p>

                <div className="flex gap-4">
                    <input
                        type="text"
                        value={configUrl}
                        onChange={(e) => setConfigUrl(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://script.google.com/macros/s/..."
                    />
                    <button
                        onClick={handleSaveConfig}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Save Config
                    </button>
                </div>
                {isSaved && <p className="text-green-600 text-sm mt-2">Configuration saved!</p>}
            </section>

            {/* Dashboard Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        className={`flex-1 py-4 text-center font-medium text-sm ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview Charts
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-medium text-sm ${activeTab === 'demographics' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('demographics')}
                    >
                        Demographics ({data.demographics.length})
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-medium text-sm ${activeTab === 'ai' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('ai')}
                    >
                        AI Reports ({data.aiFeedback.length})
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-medium text-sm ${activeTab === 'applicability' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('applicability')}
                    >
                        Applicability ({data.applicability.length})
                    </button>
                </div>

                <div className="p-6 bg-gray-50 min-h-[400px]">
                    {activeTab === 'overview' && (
                        <DashboardCharts
                            demographics={data.demographics}
                            aiFeedback={data.aiFeedback}
                            applicability={data.applicability}
                        />
                    )}

                    {activeTab === 'demographics' && (
                        <FeedbackTable data={data.demographics} type="demographics" />
                    )}

                    {activeTab === 'ai' && (
                        <FeedbackTable data={data.aiFeedback} type="aiFeedback" />
                    )}

                    {activeTab === 'applicability' && (
                        <FeedbackTable data={data.applicability} type="applicability" />
                    )}
                </div>
            </div>

            {/* Actions */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Data Management</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={() => {
                            if (configUrl) window.open(configUrl.replace('/exec', ''), '_blank'); // Usually script URL is base
                            else alert('Please configure URL first');
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Open Google Script
                    </button>

                    <button
                        onClick={() => {
                            const data = FeedbackService.exportAllData();
                            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `ncsStat_feedback_full_${new Date().toISOString().slice(0, 10)}.json`;
                            a.click();
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Download Local JSON
                    </button>
                </div>
            </section>
        </div>
    );
}
