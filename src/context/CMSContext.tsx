import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import defaultData from '../data/cms-default-data';
import { 
  ContentBlock, 
  Page, 
  MediaItem, 
  SiteSettings, 
  FormSubmission 
} from '../types';

interface CMSContextType {
  pages: Page[];
  media: MediaItem[];
  siteSettings: SiteSettings;
  formSubmissions: FormSubmission[];
  getContentBlocks: (pageSlug: string) => ContentBlock[];
  updatePage: (page: Page) => void;
  addPage: (page: Page) => void;
  deletePage: (pageId: string) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
  addMedia: (item: MediaItem) => void;
  deleteMedia: (mediaId: string) => void;
  addFormSubmission: (submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'isRead'>) => void;
  markSubmissionAsRead: (submissionId: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Page[]>(defaultData.pages);
  const [media, setMedia] = useState<MediaItem[]>(defaultData.media);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultData.siteSettings);
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>(defaultData.formSubmissions);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedPages = localStorage.getItem('cms_pages');
    const loadedMedia = localStorage.getItem('cms_media');
    const loadedSettings = localStorage.getItem('cms_settings');
    const loadedSubmissions = localStorage.getItem('cms_submissions');

    if (loadedPages) setPages(JSON.parse(loadedPages));
    if (loadedMedia) setMedia(JSON.parse(loadedMedia));
    if (loadedSettings) setSiteSettings(JSON.parse(loadedSettings));
    if (loadedSubmissions) setFormSubmissions(JSON.parse(loadedSubmissions));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cms_pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('cms_media', JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem('cms_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('cms_submissions', JSON.stringify(formSubmissions));
  }, [formSubmissions]);

  const getContentBlocks = (pageSlug: string): ContentBlock[] => {
    const page = pages.find(p => p.slug === pageSlug);
    return page?.blocks || [];
  };

  const updatePage = (updatedPage: Page) => {
    setPages(prevPages => prevPages.map(page => 
      page.id === updatedPage.id ? {...updatedPage, lastUpdated: new Date().toISOString()} : page
    ));
  };

  const addPage = (newPage: Page) => {
    setPages(prevPages => [...prevPages, {
      ...newPage,
      id: newPage.id || Date.now().toString(),
      lastUpdated: new Date().toISOString()
    }]);
  };

  const deletePage = (pageId: string) => {
    setPages(prevPages => prevPages.filter(page => page.id !== pageId));
  };

  const updateSiteSettings = (updatedSettings: SiteSettings) => {
    setSiteSettings(updatedSettings);
  };

  const addMedia = (newItem: MediaItem) => {
    setMedia(prevMedia => [...prevMedia, {
      ...newItem,
      id: newItem.id || Date.now().toString(),
      uploadedAt: new Date().toISOString()
    }]);
  };

  const deleteMedia = (mediaId: string) => {
    setMedia(prevMedia => prevMedia.filter(item => item.id !== mediaId));
  };

  const addFormSubmission = (submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'isRead'>) => {
    const newSubmission: FormSubmission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      isRead: false
    };
    
    setFormSubmissions(prevSubmissions => [newSubmission, ...prevSubmissions]);
  };

  const markSubmissionAsRead = (submissionId: string) => {
    setFormSubmissions(prevSubmissions => 
      prevSubmissions.map(submission => 
        submission.id === submissionId 
          ? { ...submission, isRead: true } 
          : submission
      )
    );
  };

  const value = {
    pages,
    media,
    siteSettings,
    formSubmissions,
    getContentBlocks,
    updatePage,
    addPage,
    deletePage,
    updateSiteSettings,
    addMedia,
    deleteMedia,
    addFormSubmission,
    markSubmissionAsRead
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};