'use client';

import { X } from 'lucide-react';

interface PromptCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromptCatalogModal({ isOpen, onClose }: PromptCatalogModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Prompt Catalog</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">Get my incidents</h3>
              <p className="text-sm text-gray-600">Retrieve all incidents assigned to you</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">Show high priority changes</h3>
              <p className="text-sm text-gray-600">Display all high priority change requests</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">Are there recurring problems?</h3>
              <p className="text-sm text-gray-600">Analyze problem patterns and trends</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
