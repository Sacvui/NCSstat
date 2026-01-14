'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronDown, Plus, X, Sparkles, Key } from 'lucide-react';

interface VariableSelectorProps {
    columns: string[];
    onAnalyze: (selectedColumns: string[], scaleName: string) => void;
    isAnalyzing: boolean;
}

export function VariableSelector({ columns, onAnalyze, isAnalyzing }: VariableSelectorProps) {
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const [scaleName, setScaleName] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleColumn = (col: string) => {
        setSelectedColumns(prev =>
            prev.includes(col)
                ? prev.filter(c => c !== col)
                : [...prev, col]
        );
    };

    const handleAnalyze = () => {
        if (selectedColumns.length < 2) {
            alert('Cần chọn ít nhất 2 biến để tính Cronbach\'s Alpha');
            return;
        }
        onAnalyze(selectedColumns, scaleName || 'Thang đo');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
                Chọn biến cho thang đo
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                Theo nguyên tắc khoa học, Cronbach's Alpha tính riêng cho từng nhóm biến (construct/thang đo).
            </p>

            {/* Scale Name Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên thang đo (tùy chọn)
                </label>
                <input
                    type="text"
                    value={scaleName}
                    onChange={(e) => setScaleName(e.target.value)}
                    placeholder="VD: Satisfaction, Loyalty, Trust..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Variable Selection Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chọn các biến ({selectedColumns.length} đã chọn)
                </label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-blue-500"
                    >
                        <span className="text-gray-700">
                            {selectedColumns.length === 0
                                ? 'Click để chọn biến...'
                                : selectedColumns.slice(0, 3).join(', ') + (selectedColumns.length > 3 ? `, +${selectedColumns.length - 3}` : '')}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {columns.map(col => (
                                <div
                                    key={col}
                                    onClick={() => toggleColumn(col)}
                                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-blue-50 ${selectedColumns.includes(col) ? 'bg-blue-100' : ''
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedColumns.includes(col)
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-gray-300'
                                        }`}>
                                        {selectedColumns.includes(col) && <Check className="w-4 h-4" />}
                                    </div>
                                    <span className="text-gray-700">{col}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Selected Variables Preview */}
            {selectedColumns.length > 0 && (
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {selectedColumns.map(col => (
                            <span
                                key={col}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                                {col}
                                <X
                                    className="w-4 h-4 cursor-pointer hover:text-red-600"
                                    onClick={() => toggleColumn(col)}
                                />
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Select Buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    type="button"
                    onClick={() => setSelectedColumns([...columns])}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Chọn tất cả
                </button>
                <span className="text-gray-400">|</span>
                <button
                    type="button"
                    onClick={() => setSelectedColumns([])}
                    className="text-sm text-gray-600 hover:underline"
                >
                    Bỏ chọn tất cả
                </button>
            </div>

            {/* Analyze Button */}
            <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || selectedColumns.length < 2}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isAnalyzing ? 'Đang phân tích...' : `Tính Cronbach's Alpha (${selectedColumns.length} biến)`}
            </button>

            {selectedColumns.length < 2 && selectedColumns.length > 0 && (
                <p className="text-sm text-orange-600 mt-2">
                    ⚠️ Cần chọn ít nhất 2 biến để tính Cronbach's Alpha
                </p>
            )}
        </div>
    );
}

// Settings Panel for API Key
export function AISettings() {
    const [apiKey, setApiKey] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('gemini_api_key', apiKey);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleClear = () => {
        localStorage.removeItem('gemini_api_key');
        setApiKey('');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cài đặt API Key"
            >
                <Key className="w-5 h-5" />
                <span className="text-sm hidden md:inline">AI Settings</span>
                {apiKey && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border p-4 z-50">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        Gemini AI API Key
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">
                        Nhập API Key Gemini của bạn để sử dụng tính năng AI giải thích.
                        Key được lưu trên máy bạn (localStorage), không gửi lên server.
                    </p>

                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg"
                        >
                            {isSaved ? '✓ Đã lưu!' : 'Lưu Key'}
                        </button>
                        {apiKey && (
                            <button
                                onClick={handleClear}
                                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg"
                            >
                                Xóa
                            </button>
                        )}
                    </div>

                    <a
                        href="https://aistudio.google.com/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-3 text-xs text-blue-600 hover:underline"
                    >
                        → Lấy API Key miễn phí tại Google AI Studio
                    </a>
                </div>
            )}
        </div>
    );
}
