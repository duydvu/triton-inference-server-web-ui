'use client'

import React, { useState } from 'react';
import { Model } from '@/types/model';
import Link from 'next/link';

function ModelItem({ model, update }: { model: Model, update: () => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnloading, setIsUnloading] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/models/${model.name}/load`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    await update();
    setIsLoading(false);
  };

  const handleUnload = async () => {
    setIsUnloading(true);
    try {
      const res = await fetch(`/api/models/${model.name}/unload`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    await update();
    setIsUnloading(false);
  };

  const isReady = model.state === 'READY';

  const badgeColor = isReady ? 'bg-green-500' : 'bg-red-500';
  const badgeText = isReady ? 'Ready' : 'Not Ready';

  return (
    <tr>
      <td className="p-4 border-b border-gray-200">
        <p className="text-sm font-bold">
          <Link href={`/models/${model.name}/versions/${model.version}`}>
            {model.name}
          </Link>
        </p>
      </td>
      <td className="p-4 border-b border-gray-200 text-center">
        <p className="text-sm">{model.version}</p>
      </td>
      <td className="p-4 border-b border-gray-200 text-center">
        <div className={`py-1 px-2 rounded text-white ${badgeColor} inline-block`}>
          <p className="text-xs">{badgeText}</p>
        </div>
      </td>
      <td className="p-4 border-b border-gray-200 text-right">
        <button
          onClick={handleLoad}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : isReady ? 'Reload' : 'Load'}
        </button>
        {isReady && (
          <button
            onClick={handleUnload}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm ml-4"
          >
            {isUnloading ? 'Unloading...' : 'Unload'}
          </button>
        )}
      </td>
    </tr>
  );
}

export default ModelItem;