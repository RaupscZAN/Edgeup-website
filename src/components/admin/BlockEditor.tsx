import React from 'react';
import WYSIWYGEditor from './WYSIWYGEditor';
import TeamManager from './TeamManager';
import { ContentBlock, TeamMember } from '../../types';

interface BlockEditorProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ block, onUpdate }) => {
  const handleTeamUpdate = (members: TeamMember[]) => {
    onUpdate({
      ...block,
      items: members
    });
  };

  const renderEditor = () => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => onUpdate({ ...block, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <WYSIWYGEditor
                value={block.subtitle || ''}
                onChange={(content) => onUpdate({ ...block, subtitle: content })}
                height={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Image URL
              </label>
              <input
                type="url"
                value={block.settings?.backgroundImage || ''}
                onChange={(e) => onUpdate({
                  ...block,
                  settings: { ...block.settings, backgroundImage: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={block.settings?.cta1?.text || ''}
                  onChange={(e) => onUpdate({
                    ...block,
                    settings: {
                      ...block.settings,
                      cta1: { ...block.settings?.cta1, text: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary CTA URL
                </label>
                <input
                  type="text"
                  value={block.settings?.cta1?.url || ''}
                  onChange={(e) => onUpdate({
                    ...block,
                    settings: {
                      ...block.settings,
                      cta1: { ...block.settings?.cta1, url: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => onUpdate({ ...block, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Description
              </label>
              <WYSIWYGEditor
                value={block.subtitle || ''}
                onChange={(content) => onUpdate({ ...block, subtitle: content })}
                height={200}
              />
            </div>

            <div>
              <TeamManager
                members={block.items as TeamMember[] || []}
                onUpdate={handleTeamUpdate}
              />
            </div>
          </div>
        );

      case 'custom':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <WYSIWYGEditor
              value={block.content || ''}
              onChange={(content) => onUpdate({ ...block, content })}
            />
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Editor not implemented for this block type
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {renderEditor()}
    </div>
  );
};

export default BlockEditor;