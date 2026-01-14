'use client';

import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

interface ResultsDisplayProps {
    analysisType: string;
    results: any;
    columns: string[];
}

export function ResultsDisplay({ analysisType, results, columns }: ResultsDisplayProps) {
    if (analysisType === 'cronbach') {
        return <CronbachResults results={results} columns={columns} />;
    }

    if (analysisType === 'correlation') {
        return <CorrelationResults results={results} columns={columns} />;
    }

    if (analysisType === 'descriptive') {
        return <DescriptiveResults results={results} columns={columns} />;
    }

    if (analysisType === 'ttest') {
        return <TTestResults results={results} columns={columns} />;
    }

    if (analysisType === 'ttest-paired') {
        return <PairedTTestResults results={results} columns={columns} />;
    }

    if (analysisType === 'anova') {
        return <ANOVAResults results={results} columns={columns} />;
    }

    if (analysisType === 'efa') {
        return <EFAResults results={results} columns={columns} />;
    }

    return null;
}

// T-test Results Component
function TTestResults({ results, columns }: { results: any; columns: string[] }) {
    const pValue = results.pValue;
    const significant = pValue < 0.05;

    return (
        <div className="space-y-6">
            <div className="bg-white border-t-2 border-b-2 border-black p-4">
                <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-700">Independent Samples T-test Results</h4>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Group 1 ({columns[0]})</td>
                            <td className="py-2 text-right">Mean = {results.mean1?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Group 2 ({columns[1]})</td>
                            <td className="py-2 text-right">Mean = {results.mean2?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Mean Difference</td>
                            <td className="py-2 text-right font-bold">{results.meanDiff?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">t-statistic</td>
                            <td className="py-2 text-right">{results.t?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Degrees of Freedom (df)</td>
                            <td className="py-2 text-right">{results.df?.toFixed(2)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">p-value (2-tailed)</td>
                            <td className={`py-2 text-right font-bold ${significant ? 'text-green-600' : 'text-gray-600'}`}>
                                {pValue?.toFixed(4)} {significant && '***'}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">95% CI</td>
                            <td className="py-2 text-right">[{results.ci95Lower?.toFixed(3)}, {results.ci95Upper?.toFixed(3)}]</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Cohen&apos;s d (Effect Size)</td>
                            <td className="py-2 text-right">{results.effectSize?.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm">
                <h4 className="font-bold mb-4 text-gray-800 uppercase text-xs tracking-wider">Kết luận</h4>
                <p className="text-sm text-gray-800">
                    {significant
                        ? `Có sự khác biệt có ý nghĩa thống kê giữa ${columns[0]} và ${columns[1]} (p = ${pValue?.toFixed(4)} < 0.05). Cohen's d = ${results.effectSize?.toFixed(2)} cho thấy ${Math.abs(results.effectSize) > 0.8 ? 'hiệu ứng lớn' : Math.abs(results.effectSize) > 0.5 ? 'hiệu ứng trung bình' : 'hiệu ứng nhỏ'}.`
                        : `Không có sự khác biệt có ý nghĩa thống kê giữa ${columns[0]} và ${columns[1]} (p = ${pValue?.toFixed(4)} >= 0.05).`
                    }
                </p>
            </div>
        </div>
    );
}

// ANOVA Results Component
function ANOVAResults({ results, columns }: { results: any; columns: string[] }) {
    const pValue = results.pValue;
    const significant = pValue < 0.05;

    return (
        <div className="space-y-6">
            <div className="bg-white border-t-2 border-b-2 border-black p-4">
                <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-700">ANOVA Table</h4>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-400">
                            <th className="py-2 text-left font-semibold">Source</th>
                            <th className="py-2 text-right font-semibold">df</th>
                            <th className="py-2 text-right font-semibold">F</th>
                            <th className="py-2 text-right font-semibold">Sig.</th>
                            <th className="py-2 text-right font-semibold">η² (Eta Squared)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Between Groups</td>
                            <td className="py-2 text-right">{results.dfBetween?.toFixed(0)}</td>
                            <td className="py-2 text-right font-bold">{results.F?.toFixed(3)}</td>
                            <td className={`py-2 text-right font-bold ${significant ? 'text-green-600' : 'text-gray-600'}`}>
                                {pValue?.toFixed(4)} {significant && '***'}
                            </td>
                            <td className="py-2 text-right">{results.etaSquared?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Within Groups</td>
                            <td className="py-2 text-right">{results.dfWithin?.toFixed(0)}</td>
                            <td className="py-2 text-right">-</td>
                            <td className="py-2 text-right">-</td>
                            <td className="py-2 text-right">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-white border-t-2 border-b-2 border-black p-4">
                <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-700">Group Means</h4>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-400">
                            <th className="py-2 text-left font-semibold">Group</th>
                            <th className="py-2 text-right font-semibold">Mean</th>
                        </tr>
                    </thead>
                    <tbody>
                        {columns.map((col, idx) => (
                            <tr key={idx} className="border-b border-gray-200">
                                <td className="py-2 font-medium">{col}</td>
                                <td className="py-2 text-right">{results.groupMeans?.[idx]?.toFixed(3)}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-50">
                            <td className="py-2 font-bold">Grand Mean</td>
                            <td className="py-2 text-right font-bold">{results.grandMean?.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm">
                <h4 className="font-bold mb-4 text-gray-800 uppercase text-xs tracking-wider">Kết luận</h4>
                <p className="text-sm text-gray-800">
                    {significant
                        ? `Có sự khác biệt có ý nghĩa thống kê giữa các nhóm (F(${results.dfBetween?.toFixed(0)}, ${results.dfWithin?.toFixed(0)}) = ${results.F?.toFixed(3)}, p = ${pValue?.toFixed(4)} < 0.05). Eta-squared = ${results.etaSquared?.toFixed(3)} cho thấy ${results.etaSquared > 0.14 ? 'hiệu ứng lớn' : results.etaSquared > 0.06 ? 'hiệu ứng trung bình' : 'hiệu ứng nhỏ'}.`
                        : `Không có sự khác biệt có ý nghĩa thống kê giữa các nhóm (F(${results.dfBetween?.toFixed(0)}, ${results.dfWithin?.toFixed(0)}) = ${results.F?.toFixed(3)}, p = ${pValue?.toFixed(4)} >= 0.05).`
                    }
                </p>
            </div>
        </div>
    );
}

function CronbachResults({ results, columns }: { results: any; columns?: string[] }) {
    const alpha = results.alpha || results.rawAlpha || 0;
    const nItems = results.nItems || 'N/A';
    const itemTotalStats = results.itemTotalStats || [];

    // SPSS Style Table Component
    const SPSSTable = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-8">
            <h4 className="text-sm font-bold uppercase mb-2 tracking-wide text-gray-700">{title}</h4>
            <div className="bg-white border-t-2 border-b-2 border-black">
                {children}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 font-sans text-gray-900">

            {/* Reliability Statistics Table - SPSS Style */}
            <SPSSTable title="Reliability Statistics">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-gray-400">
                            <th className="py-2 pr-4 font-semibold">Cronbach&apos;s Alpha</th>
                            <th className="py-2 pr-4 font-semibold">N of Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 pr-4">{alpha.toFixed(3)}</td>
                            <td className="py-2 pr-4">{nItems}</td>
                        </tr>
                    </tbody>
                </table>
            </SPSSTable>

            {/* Item-Total Statistics Table - SPSS Style */}
            {itemTotalStats.length > 0 && (
                <SPSSTable title="Item-Total Statistics">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-400">
                                <th className="py-2 px-3 font-semibold"></th>
                                <th className="py-2 px-3 font-semibold text-right">Scale Mean if Item Deleted</th>
                                <th className="py-2 px-3 font-semibold text-right">Scale Variance if Item Deleted</th>
                                <th className="py-2 px-3 font-semibold text-right">Corrected Item-Total Correlation</th>
                                <th className="py-2 px-3 font-semibold text-right">Cronbach&apos;s Alpha if Item Deleted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemTotalStats.map((item: any, idx: number) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-2 px-3 font-medium">
                                        {columns?.[idx] || item.itemName}
                                    </td>
                                    <td className="py-2 px-3 text-right">{item.scaleMeanIfDeleted?.toFixed(3) || '-'}</td>
                                    <td className="py-2 px-3 text-right">{item.scaleVarianceIfDeleted?.toFixed(3) || '-'}</td>
                                    <td className={`py-2 px-3 text-right ${item.correctedItemTotalCorrelation < 0.3 ? 'text-red-600 font-bold' : ''}`}>
                                        {item.correctedItemTotalCorrelation?.toFixed(3) || '-'}
                                    </td>
                                    <td className={`py-2 px-3 text-right ${item.alphaIfItemDeleted > alpha ? 'text-orange-600 font-bold' : ''}`}>
                                        {item.alphaIfItemDeleted?.toFixed(3) || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 italic p-2">
                        * Corrected Item-Total Correlation &lt; 0.3 được đánh dấu đỏ (cần xem xét loại bỏ).
                        Alpha if Item Deleted &gt; Alpha hiện tại được đánh dấu cam (loại bỏ có thể cải thiện độ tin cậy).
                    </p>
                </SPSSTable>
            )}

            {/* Interpretation Section */}
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm">
                <h4 className="font-bold mb-4 text-gray-800 uppercase text-xs tracking-wider">Đánh Giá &amp; Khuyến Nghị</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="text-sm font-medium mb-2 text-gray-600">Độ tin cậy thang đo:</div>
                        <div className={`text-2xl font-bold ${alpha >= 0.7 ? 'text-green-700' : 'text-orange-600'}`}>
                            {alpha >= 0.9 ? 'Xuất sắc' :
                                alpha >= 0.8 ? 'Tốt' :
                                    alpha >= 0.7 ? 'Chấp nhận được' :
                                        alpha >= 0.6 ? 'Khá' : 'Kém'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium mb-2 text-gray-600">Khuyến nghị:</div>
                        <p className="text-sm text-gray-800 leading-relaxed">
                            {alpha >= 0.7
                                ? 'Thang đo đảm bảo độ tin cậy. Có thể sử dụng cho các phân tích tiếp theo.'
                                : 'Cần xem xét loại bỏ biến quan sát rác hoặc kiểm tra lại cấu trúc thang đo.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CorrelationResults({ results, columns }: { results: any; columns: string[] }) {
    const matrix = results.correlationMatrix;

    // SmartPLS/SPSS Style Matrix
    return (
        <div className="space-y-6 overflow-x-auto">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b-2 border-black pb-2 inline-block">Ma Trận Tương Quan</h3>

            <table className="min-w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-3 px-4 text-left font-semibold bg-gray-50 border-r border-gray-200">Construct</th>
                        {columns.map((col, idx) => (
                            <th key={idx} className="py-3 px-4 font-semibold text-center border-b border-gray-300">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row: number[], rowIdx: number) => (
                        <tr key={rowIdx} className="hover:bg-gray-50 border-b border-gray-200 last:border-b-2 last:border-black">
                            <td className="py-3 px-4 font-medium border-r border-gray-200 bg-gray-50">
                                {columns[rowIdx]}
                            </td>
                            {row.map((value: number, colIdx: number) => (
                                <td
                                    key={colIdx}
                                    className={`py-3 px-4 text-center ${rowIdx === colIdx ? 'font-bold text-black' : ''} ${Math.abs(value) > 0.5 && rowIdx !== colIdx ? 'text-blue-700 font-medium' : 'text-gray-600'}`}
                                >
                                    {value.toFixed(3)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-xs text-gray-500 italic mt-2">* Tương quan &gt; 0.5 được tô màu xanh.</p>
        </div>
    );
}

function DescriptiveResults({ results, columns }: { results: any; columns: string[] }) {
    return (
        <div className="space-y-8">
            <div>
                <h4 className="text-sm font-bold uppercase mb-2 tracking-wide text-gray-700">Descriptive Statistics</h4>
                <div className="bg-white border-t-2 border-b-2 border-black overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="py-2 px-4 font-semibold"></th>
                                <th className="py-2 px-4 font-semibold text-right">N</th>
                                <th className="py-2 px-4 font-semibold text-right">Minimum</th>
                                <th className="py-2 px-4 font-semibold text-right">Maximum</th>
                                <th className="py-2 px-4 font-semibold text-right">Mean</th>
                                <th className="py-2 px-4 font-semibold text-right">Std. Deviation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {columns.map((col, idx) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-2 px-4 font-medium text-gray-900">{col}</td>
                                    <td className="py-2 px-4 text-right text-gray-600">{results.N || 'N/A'}</td>
                                    <td className="py-2 px-4 text-right text-gray-600">{(results.min && results.min[idx] !== undefined) ? results.min[idx].toFixed(3) : '-'}</td>
                                    <td className="py-2 px-4 text-right text-gray-600">{(results.max && results.max[idx] !== undefined) ? results.max[idx].toFixed(3) : '-'}</td>
                                    <td className="py-2 px-4 text-right text-gray-900 font-medium">{(results.mean && results.mean[idx] !== undefined) ? results.mean[idx].toFixed(3) : '-'}</td>
                                    <td className="py-2 px-4 text-right text-gray-600">{(results.sd && results.sd[idx] !== undefined) ? results.sd[idx].toFixed(3) : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Chart is still useful for quick visual check */}
            <div className="mt-8 p-6 bg-white border border-gray-200 shadow-sm rounded-sm">
                <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-700 text-center">Mean Value Comparison</h4>
                <Bar
                    data={{
                        labels: columns,
                        datasets: [{
                            label: 'Mean',
                            data: results.mean,
                            backgroundColor: 'rgba(15, 76, 129, 0.7)', // Deep Blue
                            borderColor: 'rgba(15, 76, 129, 1)',
                            borderWidth: 1
                        }]
                    }}
                    options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                            x: { grid: { display: false } }
                        }
                    }}
                />
            </div>
        </div>
    );
}

// Paired T-test Results Component
function PairedTTestResults({ results, columns }: { results: any; columns: string[] }) {
    const pValue = results.pValue;
    const significant = pValue < 0.05;

    return (
        <div className="space-y-6">
            <div className="bg-white border-t-2 border-b-2 border-black p-4">
                <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-700">Paired Samples T-test Results</h4>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Before ({columns[0]})</td>
                            <td className="py-2 text-right">Mean = {results.meanBefore?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">After ({columns[1]})</td>
                            <td className="py-2 text-right">Mean = {results.meanAfter?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Mean Difference (Before - After)</td>
                            <td className="py-2 text-right font-bold">{results.meanDiff?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">t-statistic</td>
                            <td className="py-2 text-right">{results.t?.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Degrees of Freedom (df)</td>
                            <td className="py-2 text-right">{results.df?.toFixed(0)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">p-value (2-tailed)</td>
                            <td className={`py-2 text-right font-bold ${significant ? 'text-green-600' : 'text-gray-600'}`}>
                                {pValue?.toFixed(4)} {significant && '***'}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">95% CI</td>
                            <td className="py-2 text-right">[{results.ci95Lower?.toFixed(3)}, {results.ci95Upper?.toFixed(3)}]</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm">
                <h4 className="font-bold mb-4 text-gray-800 uppercase text-xs tracking-wider">Kết luận</h4>
                <p className="text-sm text-gray-800">
                    {significant
                        ? `Có sự thay đổi có ý nghĩa thống kê giữa trước (${columns[0]}) và sau (${columns[1]}) (p = ${pValue?.toFixed(4)} < 0.05). Trung bình thay đổi ${results.meanDiff > 0 ? 'giảm' : 'tăng'} ${Math.abs(results.meanDiff)?.toFixed(3)} đơn vị.`
                        : `Không có sự thay đổi có ý nghĩa thống kê giữa trước và sau (p = ${pValue?.toFixed(4)} >= 0.05).`
                    }
                </p>
            </div>
        </div>
    );
}

// EFA Results Component
function EFAResults({ results, columns }: { results: any; columns: string[] }) {
    const kmo = results.kmo || 0;
    const bartlettP = results.bartlettP || 1;
    const kmoAcceptable = kmo >= 0.6;
    const bartlettSignificant = bartlettP < 0.05;

    return (
        <div className="space-y-6">
            {/* KMO and Bartlett's Test */}
            <div className="bg-white border-t-2 border-b-2 border-black p-4">
                <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-700">KMO and Bartlett&apos;s Test</h4>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Kaiser-Meyer-Olkin Measure of Sampling Adequacy</td>
                            <td className={`py-2 text-right font-bold ${kmoAcceptable ? 'text-green-600' : 'text-red-600'}`}>
                                {kmo.toFixed(3)}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Bartlett&apos;s Test of Sphericity (Sig.)</td>
                            <td className={`py-2 text-right font-bold ${bartlettSignificant ? 'text-green-600' : 'text-red-600'}`}>
                                {bartlettP < 0.001 ? '< .001' : bartlettP.toFixed(4)} {bartlettSignificant && '***'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Loadings Matrix */}
            {results.loadings && (
                <div className="bg-white border-t-2 border-b-2 border-black p-4">
                    <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-700">Factor Loadings (Rotated)</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-400">
                                    <th className="py-2 px-3 text-left font-semibold">Variable</th>
                                    {Array.isArray(results.loadings[0]) && results.loadings[0].map((_: any, idx: number) => (
                                        <th key={idx} className="py-2 px-3 text-right font-semibold">Factor {idx + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {columns.map((col, rowIdx) => (
                                    <tr key={rowIdx} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-2 px-3 font-medium">{col}</td>
                                        {Array.isArray(results.loadings[rowIdx]) && results.loadings[rowIdx].map((val: number, colIdx: number) => (
                                            <td
                                                key={colIdx}
                                                className={`py-2 px-3 text-right ${Math.abs(val) >= 0.5 ? 'font-bold text-blue-700' : Math.abs(val) >= 0.3 ? 'text-gray-700' : 'text-gray-400'}`}
                                            >
                                                {val?.toFixed(3) || '-'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-xs text-gray-500 italic mt-2">
                            * Factor loadings ≥ 0.5 được tô đậm. Loadings ≥ 0.3 được giữ lại.
                        </p>
                    </div>
                </div>
            )}

            {/* Communalities */}
            {results.communalities && (
                <div className="bg-white border-t-2 border-b-2 border-black p-4">
                    <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-700">Communalities</h4>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-400">
                                <th className="py-2 px-3 text-left font-semibold">Variable</th>
                                <th className="py-2 px-3 text-right font-semibold">Extraction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {columns.map((col, idx) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-2 px-3 font-medium">{col}</td>
                                    <td className={`py-2 px-3 text-right ${results.communalities[idx] < 0.4 ? 'text-red-600' : ''}`}>
                                        {results.communalities[idx]?.toFixed(3) || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 italic mt-2">
                        * Communality &lt; 0.4 được đánh dấu đỏ (biến giải thích kém).
                    </p>
                </div>
            )}

            {/* Interpretation */}
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm">
                <h4 className="font-bold mb-4 text-gray-800 uppercase text-xs tracking-wider">Đánh giá & Khuyến nghị</h4>
                <div className="space-y-3 text-sm text-gray-800">
                    <p>
                        <strong>KMO = {kmo.toFixed(3)}:</strong>{' '}
                        {kmo >= 0.9 ? 'Tuyệt vời' : kmo >= 0.8 ? 'Rất tốt' : kmo >= 0.7 ? 'Tốt' : kmo >= 0.6 ? 'Chấp nhận được' : 'Không phù hợp để phân tích nhân tố'}
                    </p>
                    <p>
                        <strong>Bartlett&apos;s Test:</strong>{' '}
                        {bartlettSignificant
                            ? 'Có ý nghĩa thống kê (p < 0.05), ma trận tương quan phù hợp để phân tích nhân tố.'
                            : 'Không có ý nghĩa thống kê, dữ liệu có thể không phù hợp cho EFA.'
                        }
                    </p>
                    {kmoAcceptable && bartlettSignificant ? (
                        <p className="text-green-700 font-medium">
                            ✓ Dữ liệu phù hợp để tiến hành phân tích nhân tố.
                        </p>
                    ) : (
                        <p className="text-red-600 font-medium">
                            ✗ Dữ liệu có thể không phù hợp để phân tích nhân tố. Cần xem xét lại mẫu hoặc biến quan sát.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
