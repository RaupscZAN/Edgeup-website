import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trash, Upload, Linkedin, Twitter, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TeamMember } from '../../types';

interface TeamManagerProps {
  members: TeamMember[];
  onUpdate: (members: TeamMember[]) => void;
}

interface SortableTeamMemberProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

const SortableTeamMember: React.FC<SortableTeamMemberProps> = ({ member, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
    >
      <div className="flex items-center">
        <div {...attributes} {...listeners} className="cursor-grab mr-3">
          <GripVertical size={20} className="text-gray-400" />
        </div>
        
        <div className="flex-1 flex items-center">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-medium">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.position}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(member)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamManager: React.FC<TeamManagerProps> = ({ members, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    onDrop: files => {
      if (currentMember && files[0]) {
        // In a real app, you would upload this to your storage
        const imageUrl = URL.createObjectURL(files[0]);
        setCurrentMember({
          ...currentMember,
          avatar: imageUrl
        });
      }
    }
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = members.findIndex(m => m.id === active.id);
    const newIndex = members.findIndex(m => m.id === over.id);

    onUpdate(arrayMove(members, oldIndex, newIndex));
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMember) return;

    const updatedMembers = currentMember.id
      ? members.map(m => m.id === currentMember.id ? currentMember : m)
      : [...members, { ...currentMember, id: Date.now().toString() }];

    onUpdate(updatedMembers);
    setIsModalOpen(false);
    setCurrentMember(null);
  };

  const handleDeleteMember = (id: string) => {
    onUpdate(members.filter(m => m.id !== id));
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Team Members</h2>
        <button
          onClick={() => {
            setCurrentMember({
              id: '',
              name: '',
              position: '',
              bio: '',
              avatar: '',
              socialLinks: { linkedin: '', twitter: '' }
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Team Member
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={members.map(m => m.id)}
          strategy={verticalListSortingStrategy}
        >
          {members.map(member => (
            <SortableTeamMember
              key={member.id}
              member={member}
              onEdit={(member) => {
                setCurrentMember(member);
                setIsModalOpen(true);
              }}
              onDelete={(id) => {
                setCurrentMember(members.find(m => m.id === id) || null);
                setShowDeleteConfirm(true);
              }}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* Edit Modal */}
      {isModalOpen && currentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-medium mb-4">
              {currentMember.id ? 'Edit' : 'Add'} Team Member
            </h3>
            
            <form onSubmit={handleSaveMember}>
              <div className="mb-6">
                <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer">
                  <input {...getInputProps()} />
                  {currentMember.avatar ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={currentMember.avatar}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover mb-2"
                      />
                      <span className="text-sm text-gray-600">Click or drag to replace</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Upload photo</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={currentMember.name}
                    onChange={(e) => setCurrentMember({
                      ...currentMember,
                      name: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={currentMember.position}
                    onChange={(e) => setCurrentMember({
                      ...currentMember,
                      position: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={currentMember.bio}
                  onChange={(e) => setCurrentMember({
                    ...currentMember,
                    bio: e.target.value
                  })}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Linkedin size={16} className="inline mr-1" />
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={currentMember.socialLinks?.linkedin || ''}
                    onChange={(e) => setCurrentMember({
                      ...currentMember,
                      socialLinks: {
                        ...currentMember.socialLinks,
                        linkedin: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Twitter size={16} className="inline mr-1" />
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    value={currentMember.socialLinks?.twitter || ''}
                    onChange={(e) => setCurrentMember({
                      ...currentMember,
                      socialLinks: {
                        ...currentMember.socialLinks,
                        twitter: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && currentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {currentMember.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMember(currentMember.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;