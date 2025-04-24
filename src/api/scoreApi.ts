import axios from 'axios';
import { ScoreDto, ScoreReportDto, TopStudentADto,ErrorDto } from '../types';

const API = 'https://backend-production-7b2b.up.railway.app/api/v1/scores';

export const fetchScoreByRegNumber = async (regNumber: string): Promise<ScoreDto | ErrorDto> => {
    try {
      const response = await axios.get(`${API}/${regNumber}`);
      return response.data; // Trả về dữ liệu khi thành công
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Kiểm tra nếu có lỗi từ axios
        if (error.response) {
          // Lỗi từ server
          if (error.response.status === 400) {
            // Lỗi trả về từ server: số báo danh không hợp lệ hoặc không tồn tại
            const errorData: ErrorDto = error.response.data; // Gán dữ liệu lỗi vào ErrorDto
            return errorData; // Trả về ErrorDto
          }
          // Các lỗi khác nếu có thể xử lý
          else {
            const errorData: ErrorDto = {
              timestamp: new Date().toISOString(),
              status: error.response.status,
              error: error.response.statusText,
              message: 'Có lỗi xảy ra khi gọi API',
              path: error.config?.url ?? '',
            };
            return errorData; // Trả về ErrorDto
          }
        } else if (error.request) {
          // Lỗi nếu không có phản hồi từ server
          const errorData: ErrorDto = {
            timestamp: new Date().toISOString(),
            status: 500,
            error: 'Internal Server Error',
            message: 'Không thể kết nối với server',
            path: error.config?.url ?? '',
          };
          return errorData; // Trả về ErrorDto
        } else {
          // Lỗi khác
          const errorData: ErrorDto = {
            timestamp: new Date().toISOString(),
            status: 500,
            error: 'Internal Server Error',
            message: 'Lỗi không xác định',
            path: '',
          };
          return errorData; // Trả về ErrorDto
        }
      }
      // Nếu không phải lỗi từ axios, trả về lỗi gốc
      return {
        timestamp: new Date().toISOString(),
        status: 500,
        error: 'Internal Server Error',
        message: 'Lỗi không xác định',
        path: '',
      };
    }
  };


  
  export const fetchScoreReport = async (): Promise<ScoreReportDto | ErrorDto> => {
    try {
      console.log("Calling the API...");
      const response = await axios.get<ScoreReportDto>(`${API}/report`);
  
      // Kiểm tra phản hồi từ API
      if (response.status === 200) {
        console.log('Dữ liệu nhận được từ API:', response.data);
        return response.data; // Trả về dữ liệu từ server
      } else {
        // Trường hợp phản hồi không có status 200
        return {
          message: 'Có lỗi xảy ra khi lấy báo cáo.',
          timestamp: new Date().toISOString(),
          status: response.status,
          error: 'Unknown error',
          path: `${API}/report`,
        };
      }
    } catch (error: any) {
      console.error('Lỗi khi nhận dữ liệu:', error);
  
      if (axios.isAxiosError(error) && error.response) {
        return {
          message: error.response.data.message || 'Có lỗi xảy ra khi lấy báo cáo.',
          timestamp: new Date().toISOString(),
          status: error.response.status,
          error: error.response.data.error || 'Unknown error',
          path: error.response.config.url || '',
        };
      }
  
      return {
        message: 'Không thể kết nối với server.',
        timestamp: new Date().toISOString(),
        status: 500,
        error: 'Network Error',
        path: '',
      };
    }
  };

  export const fetchTopStudentsA = async (count: number = 10): Promise<TopStudentADto[]> => {
    try {
      const response = await axios.get(`${API}/top-a`, {
        params: {
          count: count > 0 ? count : 10 // Đảm bảo count luôn dương
        }
      });
  
      return response.data.map((item: any) => ({
        registrationNumber: item.registrationNumber || 'N/A',
        math: Number(item.math) || 0,
        physics: Number(item.physics) || 0,
        chemistry: Number(item.chemistry) || 0,
        totalScoreA: Number(item.totalScoreA) || 0
      }));
    } catch (error) {
      throw new Error(`Lỗi tải dữ liệu: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
