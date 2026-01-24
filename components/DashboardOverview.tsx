// src/apps/dashboard/components/DashboardOverview.tsx
import React from 'react';
import { AppShell, BodyContent } from '@framr/core';
import { useFetchrAction } from '@fluxr/react-sdk';
import { usePortalData } from '@framr/portal';
import { 
  DashboardWidgetPortal,
  KPICardsPortal,
  ChartPanelPortal 
} from '@/components/framr/portals';

export function DashboardOverview() {
  // Fetch user's tool usage data
  const { data: toolUsage, loading } = useFetchrAction(
    'internal:api:tools',
    {
      action: 'read',
      resource: 'usage',
      params: { userId: 'current' }
    },
    { cache: true, cacheTtl: 300 }
  );

  // Portal-specific data loading
  const { data: kpiData } = usePortalData('kpiCards', async () => {
    const response = await fetch('/api/dashboard/kpis');
    return response.json();
  });

  return (
    <AppShell layout="dashboard" performanceMode="progressive">
      <BodyContent
        showSidebar={true}
        sidebarPosition="left"
        sidebarContent={<ToolNavigationSidebar />}
      >
        {/* KPI Cards Portal */}
        <KPICardsPortal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPICard
              title="Tools Accessed"
              value={toolUsage?.totalAccessed || 0}
              trend="+12%"
              icon="tool"
            />
            <KPICard
              title="Reports Generated"
              value={toolUsage?.reportsGenerated || 0}
              trend="+25%"
              icon="report"
            />
            <KPICard
              title="AI Credits Used"
              value={toolUsage?.creditsUsed || 0}
              max={toolUsage?.creditsLimit || 1000}
              icon="credit"
            />
            <KPICard
              title="Subscription"
              value={toolUsage?.tier || 'Free'}
              action="Upgrade"
              icon="tier"
            />
          </div>
        </KPICardsPortal>

        {/* Dashboard Widgets Portal */}
        <DashboardWidgetPortal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <QuickAccessTools tools={toolUsage?.recentTools} />
            <RecentReports reports={toolUsage?.recentReports} />
          </div>
        </DashboardWidgetPortal>

        {/* Analytics Chart Portal */}
        <ChartPanelPortal>
          <UsageChart data={toolUsage?.chartData} />
        </ChartPanelPortal>
      </BodyContent>
    </AppShell>
  );
}