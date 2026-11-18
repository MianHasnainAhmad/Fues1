import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminPageHeader = ({
  title,
  description,
  breadcrumbs = [],
  actions = null,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E7E0] dark:border-[#22221F]">
      <div className="space-y-1.5">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-[#71717A] dark:text-[#8C8C87]">
            <Link to="/admin/dashboard" className="hover:text-[#171717] dark:hover:text-white transition-colors">
              Admin
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-[#171717] dark:hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#171717] dark:text-[#F5F5F0] font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F5F5F0] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A8A8A2] max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {actions}
        </div>
      )}
    </div>
  );
};

export default AdminPageHeader;
