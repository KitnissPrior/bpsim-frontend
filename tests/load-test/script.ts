import http from 'k6/http';

const subjectAreaId = 13;
const modelId = 16;
export const options = {
  hosts: { 'test.k6.io': '1.2.3.4' },
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 150 },
    { duration: '1m', target: 180 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 0 },
  ],
  thresholds: { http_req_duration: ['avg<1000', 'p(95)<2000'] },
  noConnectionReuse: true,
  userAgent: 'student/1.0',
};

export default function () {
  http.get(`http://localhost:8000/start/${subjectAreaId}/${modelId}/`);
}