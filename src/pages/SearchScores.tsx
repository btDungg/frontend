import { useState } from 'react';
import SearchRegistration from '../components/SearchRegistration';
import { fetchScoreByRegNumber } from '../api/scoreApi';
import { ScoreDto, ErrorDto } from '../types';
import DetailedScores from '../components/DetailedScores';

const SearchScores = () => {
  const [score, setScore] = useState<ScoreDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Lỗi frontend
  const [regNumber, setRegNumber] = useState(''); // State để theo dõi số báo danh

  const handleSearch = async (regNumber: string) => {
    // Xóa tất cả lỗi trước khi bắt đầu tìm kiếm
    setError(null); 
    setScore(null); 

    if (!regNumber.trim()) {
      setError('Số báo danh không được để trống.'); // Lỗi frontend nếu không có số báo danh
      return;
    }

    setLoading(true);

    try {
      const result = await fetchScoreByRegNumber(regNumber);

      if ((result as ErrorDto).message) {
        const errorData = result as ErrorDto;
        setError(errorData.message); // Hiển thị lỗi từ backend (nếu có)
      } else {
        setScore(result as ScoreDto); // Cập nhật score nếu tìm thấy dữ liệu
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi gọi API.'); // Lỗi khi gọi API (lỗi từ FE hoặc mạng)
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <div className="search-scores container mx-auto p-4">
      <SearchRegistration onSubmit={handleSearch} />

      {loading && (
        <div className="loading-indicator">
          <p>Đang tìm kiếm...</p>
          <div className="spinner"></div>
        </div>
      )}

      {/* Hiển thị lỗi nếu có */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {/* Kiểm tra dữ liệu trả về */}
      {score ? (
        <div className="score-result">
          <DetailedScores score={score} />
        </div>
      ) : null}
    </div>
  );
};

export default SearchScores;
