'use client'

import React, { useState } from 'react';
import { Model } from '@/types/model';

function ModelItem({ model }: { model: Model }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadClick = () => {
    setIsLoading(true);
    fetch(`v2/repository/models/${model.name}/load`, { method: 'POST' })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleUnloadClick = () => {
    setIsLoading(true);
    fetch(`v2/repository/models/${model.name}/unload`, { method: 'POST' })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const badgeColor = model.state === 'READY' ? 'bg-green-500' : 'bg-red-500';
  const badgeText = model.state === 'READY' ? 'Ready' : 'Not Ready';

  return (
    <tr>
      <td className="p-4 border-b border-gray-200">
        <p className="text-sm font-bold">{model.name}</p>
      </td>
      <td className="p-4 border-b border-gray-200 text-center">
        <p className="text-sm">{model.version}</p>
      </td>
      <td className="p-4 border-b border-gray-200 text-center">
        <div className={`py-1 px-2 rounded text-white ${badgeColor} inline-block`}>
          <p className="text-xs">{badgeText}</p>
        </div>
      </td>
      <td className="p-4 border-b border-gray-200 text-center">
        {model.state === 'READY' ? (
          <button
            onClick={handleLoadClick}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Unload
          </button>
        ) : (
          <button
            onClick={handleUnloadClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Load
          </button>
        )}
      </td>
    </tr>
  );
}

export default ModelItem;