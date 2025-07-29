"use client";

import { useState, useEffect } from 'react';
import FileExplorer from '../components/FileExplorer';
import { FileExplorerState } from '../types/types';

export default function Home() {
  const [state, setState] = useState<FileExplorerState>({
    files: [],
    currentFolder: null,
    breadcrumbs: [],
  });

  // Load from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('fileExplorer');
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fileExplorer', JSON.stringify(state));
  }, [state]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-sky-500 font-bold mb-4">Mahfuz Drive</h1>
      <FileExplorer state={state} setState={setState} />
    </div>
  );
}
