'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, AlertCircle, Package, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const priceData = [
  { channel: 'Shopify', price: 45, competitor: 42 },
  { channel: 'Amazon', price: 48, competitor: 50 },
  { channel: 'TikTok', price: 42, competitor: 42 },
];

const inventoryData = [
  { name: 'Mon', inventory: 240 },
  { name: 'Tue', inventory: 320 },
  { name: 'Wed', inventory: 280 },
  { name: 'Thu', inventory: 380 },
  { name: 'Fri', inventory: 420 },
  { name: 'Sat', inventory: 480 },
  { name: 'Sun', inventory: 510 },
];

const MetricCard = ({ icon: Icon, label, value, status, change }: any) => (
  <div className="bg-secondary/40 rounded-lg p-4 border border-border/50 space-y-2">
    <div className="flex items-center justify-between">
      <Icon className="w-5 h-5 text-primary" />
      <span className={`text-xs font-semibold px-2 py-1 rounded ${status === 'good' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
        {change}
      </span>
    </div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export function DashboardPreview() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-secondary/20 via-secondary/5 to-transparent rounded-lg overflow-hidden border border-border/50 p-8">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl -z-10"></div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Live Inventory & Pricing Dashboard</h3>
            <p className="text-xs text-muted-foreground mt-1">Real-time sync across all channels</p>
          </div>
          <div className={`w-3 h-3 rounded-full ${isAnimating ? 'bg-green-500' : 'bg-green-500/50'} transition-all duration-500`}></div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-3">
          <MetricCard
            icon={Package}
            label="Total SKUs"
            value="254"
            status="good"
            change="+12 this week"
          />
          <MetricCard
            icon={DollarSign}
            label="Avg Price Sync"
            value="100%"
            status="good"
            change="No errors"
          />
          <MetricCard
            icon={TrendingUp}
            label="Velocity (7d)"
            value="23%"
            status="good"
            change="↑ vs last week"
          />
          <MetricCard
            icon={AlertCircle}
            label="Price Gaps"
            value="2"
            status="warning"
            change="Monitor"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Inventory Trend */}
          <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
            <p className="text-sm font-semibold text-foreground mb-3">Inventory Trend</p>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" style={{ fontSize: '12px' }} />
                <YAxis stroke="rgba(0,0,0,0.5)" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.1)' }}
                  labelStyle={{ color: 'rgba(0,0,0,0.8)' }}
                />
                <Line type="monotone" dataKey="inventory" stroke="#0ea5e9" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Channel Pricing Comparison */}
          <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
            <p className="text-sm font-semibold text-foreground mb-3">Pricing vs Competitors</p>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="channel" stroke="rgba(0,0,0,0.5)" style={{ fontSize: '12px' }} />
                <YAxis stroke="rgba(0,0,0,0.5)" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.1)' }}
                  labelStyle={{ color: 'rgba(0,0,0,0.8)' }}
                />
                <Bar dataKey="price" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="competitor" fill="rgba(14,165,233,0.3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-secondary/30 rounded-lg p-4 border border-border/50 space-y-2">
          <p className="text-sm font-semibold text-foreground">Recent Updates</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Inventory synced from Shopify (2 min ago)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Amazon prices updated across 47 SKUs (5 min ago)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Price gap detected on top sellers (12 min ago)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
