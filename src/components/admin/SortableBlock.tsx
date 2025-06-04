import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash } from 'lucide-react';
import { ContentBlock } from '../../types';

interface SortableBlockProps {
  block: ContentBlock;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableBlock: React.FC<SortableBlockProps> = ({ block, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg p-4 ${
        isDragging ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            {...attributes}
            {...listeners}
            className="p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={20} className="text-gray-400" />
          </button>
          <div className="ml-3">
            <span className="text-sm font-medium capitalize">{block.type}</span>
            {block.title && (
              <p className="text-sm text-gray-500 mt-1">{block.title}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-1 hover:bg-gray-100 rounded text-blue-600"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-gray-100 rounded text-red-600"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortableBlock;