import React, { useEffect, useState } from 'react';
import { fetchTopStudentsA } from '../api/scoreApi';
import { TopStudentADto } from '../types';

const TopStudentsA = () => {
    const [students, setStudents] = useState<TopStudentADto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchTopStudentsA();
                setStudents(data);
            } catch (error) {
                console.error('Error loading group A data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div className="text-center text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div className="top-students-content">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Top 10 Học Sinh Khối A</h2>
            <div style={{ width: '100%' }}>
                <table className="student-table w-full border-collapse border border-gray-200 text-center">
                    <thead>
                        <tr className="bg-blue-100 text-blue-800">
                            <th className="py-3 px-4 border border-gray-200">SBD</th>
                            <th className="py-3 px-4 border border-gray-200">Toán</th>
                            <th className="py-3 px-4 border border-gray-200">Lý</th>
                            <th className="py-3 px-4 border border-gray-200">Hóa</th>
                            <th className="py-3 px-4 border border-gray-200">Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, idx) => (
                            <tr key={student.registrationNumber} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="py-3 px-4 border border-gray-200">{student.registrationNumber}</td>
                                <td className="py-3 px-4 border border-gray-200">{student.math.toFixed(1)}</td>
                                <td className="py-3 px-4 border border-gray-200">{student.physics.toFixed(1)}</td>
                                <td className="py-3 px-4 border border-gray-200">{student.chemistry.toFixed(1)}</td>
                                <td className="py-3 px-4 border border-gray-200 font-semibold text-blue-600">{student.totalScoreA.toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopStudentsA;
