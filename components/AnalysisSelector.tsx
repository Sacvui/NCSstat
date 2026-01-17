import React from 'react';
import { BarChart2, Shield, Network, Users, GitCompare, Layers, TrendingUp, Grid3x3, Activity } from 'lucide-react';

interface AnalysisSelectorProps {
    onSelect: (step: string) => void;
    onRunAnalysis: (type: string) => void;
    isAnalyzing: boolean;
}

const analysisOptions = [
    {
        id: 'descriptive',
        title: 'Thống kê mô tả',
        description: 'Mean, SD, Min, Max, Median',
        icon: BarChart2,
        color: 'indigo',
        action: 'run'
    },
    {
        id: 'cronbach-select',
        title: "Cronbach's Alpha",
        description: 'Kiểm tra độ tin cậy thang đo',
        icon: Shield,
        color: 'blue',
        action: 'select'
    },
    {
        id: 'correlation',
        title: 'Ma trận tương quan',
        description: 'Phân tích mối quan hệ giữa các biến',
        icon: Network,
        color: 'purple',
        action: 'run'
    },
    {
        id: 'ttest-select',
        title: 'Independent T-test',
        description: 'So sánh 2 nhóm độc lập',
        icon: GitCompare,
        color: 'green',
        action: 'select'
    },
    {
        id: 'ttest-paired-select',
        title: 'Paired T-test',
        description: 'So sánh trước-sau (cặp đôi)',
        icon: Users,
        color: 'emerald',
        action: 'select'
    },
    {
        id: 'anova-select',
        title: 'ANOVA',
        description: 'So sánh trung bình nhiều nhóm',
        icon: Layers,
        color: 'violet',
        action: 'select'
    },
    {
        id: 'efa-select',
        title: 'EFA',
        description: 'Phân tích nhân tố khám phá',
        icon: Grid3x3,
        color: 'orange',
        action: 'select'
    },
    {
        id: 'regression-select',
        title: 'Hồi quy Tuyến tính',
        description: 'Multiple Linear Regression',
        icon: TrendingUp,
        color: 'pink',
        action: 'select'
    },
    {
        id: 'chisq-select',
        title: 'Chi-Square Test',
        description: 'Kiểm định độc lập (Biến định danh)',
        icon: Grid3x3,
        color: 'teal',
        action: 'select'
    },
    {
        id: 'mannwhitney-select',
        title: 'Mann-Whitney U',
        description: 'So sánh 2 nhóm (Phi tham số)',
        icon: Activity,
        color: 'cyan',
        action: 'select'
    }
];

export function AnalysisSelector({ onSelect, onRunAnalysis, isAnalyzing }: AnalysisSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysisOptions.map((option) => {
                const Icon = option.icon;
                const handleClick = () => {
                    if (option.action === 'run') {
                        onRunAnalysis(option.id);
                    } else {
                        onSelect(option.id);
                    }
                };

                return (
                    <button
                        key={option.id}
                        onClick={handleClick}
                        disabled={isAnalyzing}
                        className={`group relative p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-${option.color}-500 hover:shadow-lg transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden`}
                    >
                        {/* Gradient background on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${option.color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2.5 rounded-lg bg-${option.color}-100 text-${option.color}-600 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-slate-900">
                                {option.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                                {option.description}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
