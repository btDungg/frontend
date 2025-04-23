import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { fetchScoreReport } from '../api/scoreApi'; 
import { ScoreReportDto, ErrorDto } from '../types'; 


const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#F44336']; 

const SUBJECT_NAMES: { [key: string]: string } = {
  math: 'Toán',
  literature: 'Ngữ Văn',
  foreignLanguage: 'Ngoại Ngữ',
  physics: 'Vật Lý',
  chemistry: 'Hóa Học',
  biology: 'Sinh Học',
  history: 'Lịch Sử',
  geography: 'Địa Lý',
  civicEducation: 'GDCD',
};

const FeatureReport: React.FC = () => {
  const [reportData, setReportData] = useState<ScoreReportDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchScoreReport();
        if ('subjectStatistics' in data) {
          setReportData(data); 
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu');
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi tải dữ liệu báo cáo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const prepareBarChartData = (data: ScoreReportDto) => {
    return Object.entries(data.subjectStatistics).map(([subject, stats]) => ({
      subject: SUBJECT_NAMES[subject] || subject,
      'Level 1 (≥ 8.0)': stats.level1Count,
      'Level 2 (6.0-7.9)': stats.level2Count,
      'Level 3 (4.0-5.9)': stats.level3Count,
      'Level 4 (< 4.0)': stats.level4Count,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Đang tải dữ liệu báo cáo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Lỗi khi tải báo cáo</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-700">Không tìm thấy dữ liệu báo cáo.</p>
      </div>
    );
  }

  const barChartData = prepareBarChartData(reportData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Báo Cáo Thống Kê Điểm Thi Tốt Nghiệp THPT
      </h1>

      {Object.entries(reportData.subjectStatistics).map(([subject, stats]) => (
        <div key={subject} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{SUBJECT_NAMES[subject] || subject}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{
              subject: SUBJECT_NAMES[subject] || subject,
              'Level 1 (≥ 8.0)': stats.level1Count,
              'Level 2 (6.0-7.9)': stats.level2Count,
              'Level 3 (4.0-5.9)': stats.level3Count,
              'Level 4 (< 4.0)': stats.level4Count,
            }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Level 1 (≥ 8.0)" fill={COLORS[0]}>
                <LabelList
                  dataKey="Level 1 (≥ 8.0)"
                  position="inside"
                  fill="#fff"
                  formatter={(value: number) => value.toLocaleString()}
                />
              </Bar>
              <Bar dataKey="Level 2 (6.0-7.9)" fill={COLORS[1]}>
                <LabelList
                  dataKey="Level 2 (6.0-7.9)"
                  position="inside"
                  fill="#fff"
                  formatter={(value: number) => value.toLocaleString()}
                />
              </Bar>
              <Bar dataKey="Level 3 (4.0-5.9)" fill={COLORS[2]}>
                <LabelList
                  dataKey="Level 3 (4.0-5.9)"
                  position="inside"
                  fill="#fff"
                  formatter={(value: number) => value.toLocaleString()}
                />
              </Bar>
              <Bar dataKey="Level 4 (< 4.0)" fill={COLORS[3]}>
                <LabelList
                  dataKey="Level 4 (< 4.0)"
                  position="inside"
                  fill="#fff"
                  formatter={(value: number) => value.toLocaleString()}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default FeatureReport;
