'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Signup {
  id: number;
  email: string;
  name: string;
  reason: string | null;
  created_at: string;
}

export default function SignupsAdmin() {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchSignups();
    const interval = setInterval(fetchSignups, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSignups = async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('signups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSignups(data || []);
      setTotalCount(data?.length || 0);

      // Calculate weekly signups
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const weekly = (data || []).filter(
        (signup) => new Date(signup.created_at) > oneWeekAgo
      ).length;
      setWeeklyCount(weekly);
    } catch (error) {
      console.error('Failed to fetch signups:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Reason', 'Date'];
    const rows = signups.map((s) => [
      s.name,
      s.email,
      s.reason || '',
      new Date(s.created_at).toLocaleString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sfe-signups-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF2F7] flex items-center justify-center">
        <p className="text-lg text-[#1D3557]">Loading signups...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF2F7] py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1D3557] mb-2">Signups Dashboard</h1>
          <p className="text-[#1D3557]/70">All SFE Foundry member signups</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
            <p className="text-[#1D3557]/70 text-sm mb-2">Total Signups</p>
            <p className="text-4xl font-bold text-blue-600">{totalCount}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <p className="text-[#1D3557]/70 text-sm mb-2">This Week</p>
            <p className="text-4xl font-bold text-green-600">{weeklyCount}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-cyan-100">
            <button
              onClick={exportCSV}
              className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition"
            >
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D3557]">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D3557]">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D3557]">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D3557]">
                    Signed Up
                  </th>
                </tr>
              </thead>
              <tbody>
                {signups.map((signup, idx) => (
                  <tr
                    key={signup.id}
                    className={`border-b border-gray-100 hover:bg-blue-50 transition ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[#1D3557]">
                      {signup.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1D3557]/70">
                      {signup.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1D3557]/70">
                      {signup.reason || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1D3557]/70">
                      {new Date(signup.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {signups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#1D3557]/70">No signups yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#1D3557]/70">
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}
