import React from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center border-b border-gray-200 mb-8">
                    <h1 className="text-xl font-bold text-blue-600">ncsStat Admin</h1>
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-700">Back to App</a>
                </div>
                {children}
            </div>
        </div>
    );
}
