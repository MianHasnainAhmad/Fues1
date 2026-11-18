import React from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const TeamCard = ({ team }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E7E0] p-5 sm:p-6 shadow-sm hover-lift flex flex-col justify-between transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="lavender" size="sm">
            {team.category}
          </Badge>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
            {team.currentStage}
          </span>
        </div>

        <Link to={`/teams/${team.id}`} className="block group">
          <h3 className="text-lg font-bold text-[#171717] group-hover:text-[#FF7043] transition-colors mb-1.5">
            {team.name}
          </h3>
        </Link>
        <p className="text-sm text-[#525252] leading-relaxed line-clamp-2 mb-4">
          {team.tagline}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#737373] font-medium">Milestone Progress</span>
            <span className="font-bold text-[#171717]">{team.progressPercentage || 0}%</span>
          </div>
          <div className="w-full h-2 bg-[#F2F1EC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF7043] rounded-full transition-all duration-500"
              style={{ width: `${team.progressPercentage || 0}%` }}
            />
          </div>
        </div>

        {/* Member Avatars */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex -space-x-2">
            {team.members?.map((member, i) => (
              <Avatar
                key={member.id || i}
                src={member.avatar}
                name={member.name}
                size="sm"
                className="ring-2 ring-white"
              />
            ))}
          </div>
          <span className="text-xs text-[#737373] font-medium">
            {team.members?.length} active member{team.members?.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-[#F0EFEA]">
        <Link to={`/teams/${team.id}`} className="block">
          <Button variant="outline" size="sm" className="w-full" icon={ArrowRight} iconPosition="right">
            Open Team Workspace
          </Button>
        </Link>
      </div>
    </div>
  );
};
