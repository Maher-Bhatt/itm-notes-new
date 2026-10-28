import React from 'react';
import { CampusSidebar } from '@/components/campusloop/CampusSidebar';

interface PortalSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
}

export function PortalSidebar({ isOpen = false, onClose, isCollapsed = false }: PortalSidebarProps) {
  if (isCollapsed) return null;
  return <CampusSidebar isOpen={isOpen} onClose={onClose} />;
}
