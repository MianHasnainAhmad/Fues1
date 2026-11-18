import api from './api';
import { mockAdminAnalytics } from '../data/mockAdminData';

/**
 * Admin Analytics Service
 * DRF target endpoints:
 * - GET /api/admin/analytics/overview/
 * - GET /api/admin/analytics/export-csv/
 */
export const adminAnalyticsService = {
  getAnalytics: async (dateRange = '30d') => {
    // DRF integration point:
    // const response = await api.get('/admin/analytics/overview/', { params: { range: dateRange } });
    await new Promise((res) => setTimeout(res, 250));
    return mockAdminAnalytics;
  },

  /**
   * Client-side CSV generator and downloader for available datasets
   */
  exportToCSV: (filename, data) => {
    if (!data || !data.length) return false;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            let val = row[fieldName] ?? '';
            if (typeof val === 'object') val = JSON.stringify(val).replace(/"/g, '""');
            val = String(val).replace(/"/g, '""');
            return `"${val}"`;
          })
          .join(',')
      ),
    ];

    const csvBlob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  },
};

export default adminAnalyticsService;
