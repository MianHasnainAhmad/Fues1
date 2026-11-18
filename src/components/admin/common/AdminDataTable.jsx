import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { adminAnalyticsService } from '../../../services/adminAnalyticsService';
import toast from 'react-hot-toast';

export const AdminDataTable = ({
  columns = [],
  data = [],
  searchKey = '',
  searchPlaceholder = 'Search records...',
  filterComponent = null,
  exportFilename = 'fuse-admin-data',
  loading = false,
  itemsPerPageOptions = [5, 10, 25],
  initialPerPage = 10,
  emptyTitle = 'No records found',
  emptyMessage = 'Try adjusting your search query or filters.',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  // Search filter
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((item) => {
      if (searchKey && item[searchKey]) {
        return String(item[searchKey]).toLowerCase().includes(q);
      }
      return Object.values(item).some((val) => {
        if (typeof val === 'string' || typeof val === 'number') {
          return String(val).toLowerCase().includes(q);
        }
        if (typeof val === 'object' && val !== null) {
          return Object.values(val).some((v) =>
            typeof v === 'string' && v.toLowerCase().includes(q)
          );
        }
        return false;
      });
    });
  }, [data, searchQuery, searchKey]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExport = () => {
    const success = adminAnalyticsService.exportToCSV(exportFilename, sortedData);
    if (success) {
      toast.success(`Exported ${sortedData.length} rows to CSV`);
    } else {
      toast.error('No data available to export');
    }
  };

  return (
    <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-2xl shadow-xs overflow-hidden flex flex-col">
      {/* Top Controls Toolbar */}
      <div className="p-4 sm:p-5 border-b border-[#F0EFEA] dark:border-[#22221F] flex flex-col md:flex-row md:items-center justify-between gap-3.5 bg-stone-50/50 dark:bg-[#141413]">
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto sm:min-w-[220px] max-w-sm flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#171717] dark:focus:border-stone-500 transition-colors"
            />
          </div>

          {/* Filters slot */}
          {filterComponent}
        </div>

        {/* Export & Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExport}
            className="text-xs font-semibold"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0EFEA] dark:border-[#22221F] bg-[#FAF9F5]/70 dark:bg-[#161615]">
              {columns.map((col) => (
                <th
                  key={col.key || col.header}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`py-3 px-4 text-[11px] font-bold text-[#71717A] dark:text-[#A8A8A2] uppercase tracking-wider ${
                    col.sortable ? 'cursor-pointer select-none hover:text-[#171717] dark:hover:text-white' : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F0EFEA] dark:divide-[#22221F] text-xs sm:text-sm text-[#171717] dark:text-[#F5F5F0]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, colIdx) => (
                    <td key={colIdx} className="py-4 px-4">
                      <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-md w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 px-4 text-center">
                  <EmptyState
                    title={emptyTitle}
                    description={emptyMessage}
                  />
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-[#FAF9F5] dark:hover:bg-[#20201E] transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.header}
                      className={`py-3.5 px-4 align-middle ${col.cellClassName || ''}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-[#F0EFEA] dark:border-[#22221F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/40 dark:bg-[#141413] text-xs text-[#71717A] dark:text-[#A8A8A2]">
        <div className="flex items-center gap-2 flex-wrap">
          <span>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-lg px-2 py-1 text-xs text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
          >
            {itemsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="ml-1 sm:ml-2">
            Showing <strong className="text-[#171717] dark:text-[#F5F5F0]">{sortedData.length ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> -{' '}
            <strong className="text-[#171717] dark:text-[#F5F5F0]">{Math.min(currentPage * itemsPerPage, sortedData.length)}</strong> of{' '}
            <strong className="text-[#171717] dark:text-[#F5F5F0]">{sortedData.length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 self-center sm:self-auto shrink-0">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-[#E8E7E0] dark:border-[#2B2B27] hover:bg-white dark:hover:bg-[#20201E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-[#171717] dark:text-[#F5F5F0]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-[#E8E7E0] dark:border-[#2B2B27] hover:bg-white dark:hover:bg-[#20201E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDataTable;
