import { ScoreDto } from '../types';

interface DetailedScoresProps {
  score: ScoreDto;
}

const DetailedScores = ({ score }: DetailedScoresProps) => {
  const subjects = [
    { name: 'Toán', value: score.math },
    { name: 'Văn', value: score.literature },
    { name: 'Ngoại ngữ', value: score.foreignLanguage },
    { name: 'Vật lý', value: score.physics },
    { name: 'Hóa học', value: score.chemistry },
    { name: 'Sinh học', value: score.biology },
    { name: 'Lịch sử', value: score.history },
    { name: 'Địa lý', value: score.geography },
    { name: 'GDCD', value: score.civicEducation },
  ];

  return (
    <div className="detailed-scores bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Chi tiết điểm số</h2>
      <div className="space-y-4">
        <div className="flex justify-between p-2">
          <div className="font-medium">Mã số</div>
          <div>{score.registrationNumber}</div>
        </div>
        <div className="flex justify-between p-2">
          <div className="font-medium">Mã ngoại ngữ</div>
          <div>{score.foreignLanguageCode}</div>
        </div>

        {subjects.map((subject) => (
          <div key={subject.name} className="flex justify-between p-2">
            <div className="font-medium">{subject.name}</div>
            <div className={`font-semibold ${subject.value !== null ? 'text-blue-600' : 'text-gray-500'}`}>
              {subject.value !== null ? subject.value : '-'} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedScores;
