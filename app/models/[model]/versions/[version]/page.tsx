'use client'

import React, { useEffect, useState } from 'react';

function ModelView({ params }: { params: { model: string, version: string } }) {
  const { model, version } = params;
  const [config, setConfig] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/models/${model}/versions/${version}`);
      const { config, stats } = await res.json();
      setConfig(config);
      setStats(stats);
      setLoading(false);
    })()
  }, [model, version]);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-20">
      {loading && <p>Loading...</p>}
      {!loading && config && stats && (
        <>
          <div className="py-5">
            <h1 className="text-3xl font-bold">{config.name}</h1>
          </div>

          <div className="py-5">
            <h2 className="text-xl font-bold">Stats</h2>
          </div>
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(stats).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {key}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-pre">
                    {JSON.stringify(value, null, 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="py-5 mt-20">
            <h2 className="text-xl font-bold">Config</h2>
          </div>
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(config).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {key}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-pre">
                    {JSON.stringify(value, null, 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ModelView;
