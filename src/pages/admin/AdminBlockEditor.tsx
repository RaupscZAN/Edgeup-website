import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Page, ContentBlock } from '../../types';
import SortableBlock from '../../components/admin/SortableBlock';
import BlockEditor from '../../components/admin/BlockEditor';

const AdminBlockEditor: React.FC = () => {
  const { pages, updatePage } = useCMS();
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);

  const blockTypes = [
    { type: 'hero', label: 'Hero Section' },
    { type: 'features', label: 'Features Section' },
    { type: 'testimonials', label: 'Testimonials Section' },
    { type: 'partners', label: 'Partners Section' },
    { type: 'team', label: 'Team Section' },
    { type: 'custom', label: 'Custom Content' },
    { type: 'cta', label: 'CTA Section' }
  ];

  const handlePageSelect = (page: Page) => {
    setCurrentPage(page);
    setEditingBlock(null);
  };

  const handleAddBlock = (type: string) => {
    if (!currentPage) return;

    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: type as ContentBlock['type'],
      title: '',
      subtitle: '',
      content: '',
      items: [],
      settings: {}
    };

    const updatedPage = {
      ...currentPage,
      blocks: [...currentPage.blocks, newBlock]
    };

    updatePage(updatedPage);
    setCurrentPage(updatedPage);
    setShowBlockPicker(false);
    setEditingBlock(newBlock);
  };

  const handleUpdateBlock = (updatedBlock: ContentBlock) => {
    if (!currentPage) return;

    const updatedBlocks = currentPage.blocks.map(block =>
      block.id === updatedBlock.id ? updatedBlock : block
    );

    const updatedPage = {
      ...currentPage,
      blocks: updatedBlocks
    };

    updatePage(updatedPage);
    setCurrentPage(updatedPage);
  };

  const handleDeleteBlock = (blockId: string) => {
    if (!currentPage) return;

    const updatedPage = {
      ...currentPage,
      blocks: currentPage.blocks.filter(block => block.id !== blockId)
    };

    updatePage(updatedPage);
    setCurrentPage(updatedPage);
    setEditingBlock(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!currentPage) return;

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = currentPage.blocks.findIndex(block => block.id === active.id);
    const newIndex = currentPage.blocks.findIndex(block => block.id === over.id);

    const updatedPage = {
      ...currentPage,
      blocks: arrayMove(currentPage.blocks, oldIndex, newIndex)
    };

    updatePage(updatedPage);
    setCurrentPage(updatedPage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="pl-64">
        <AdminHeader title="Content Blocks" />
        
        <main className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Page Selector */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4">Pages</h3>
                <div className="space-y-2">
                  {pages.map(page => (
                    <button
                      key={page.id}
                      onClick={() => handlePageSelect(page)}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        currentPage?.id === page.id
                          ? 'bg-blue-50 text-blue-800'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {page.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Block Editor */}
            <div className="col-span-9">
              {currentPage ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">
                        Editing: {currentPage.title}
                      </h2>
                      <button
                        onClick={() => setShowBlockPicker(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Block
                      </button>
                    </div>

                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={currentPage.blocks.map(block => block.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-4">
                          {currentPage.blocks.map(block => (
                            <SortableBlock
                              key={block.id}
                              block={block}
                              onEdit={() => setEditingBlock(block)}
                              onDelete={() => handleDeleteBlock(block.id)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>

                  {editingBlock && (
                    <BlockEditor
                      block={editingBlock}
                      onUpdate={handleUpdateBlock}
                    />
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                  Select a page to edit its content blocks
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Block Type Picker Modal */}
      {showBlockPicker && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowBlockPicker(false)} />
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add Content Block
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {blockTypes.map(({ type, label }) => (
                  <button
                    key={type}
                    onClick={() => handleAddBlock(type)}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <h4 className="font-medium">{label}</h4>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlockEditor;