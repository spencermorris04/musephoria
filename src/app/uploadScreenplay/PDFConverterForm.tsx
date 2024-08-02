// app/uploadScreenplay/PDFConverterForm.tsx
'use client';

import React, { useState } from 'react';
import { api } from "~/trpc/react";
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import { type Screenplay } from './PDFComponent'; // Adjust the import path as needed

const PDFComponent = dynamic(
  () => import('./PDFComponent').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <p>Loading PDF converter...</p>,
  }
);

export default function PDFConverterForm() {
  const [parsedScreenplay, setParsedScreenplay] = useState<Screenplay | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const { data: session } = useSession();

  const uploadMutation = api.screenplayUpload.uploadScreenplay.useMutation({
    onMutate: () => {
      setUploadStatus('uploading');
      setStatusMessage('Uploading screenplay...');
    },
    onSuccess: (data) => {
      setUploadStatus('success');
      setStatusMessage(`Upload successful! Document ID: ${data.id}`);
    },
    onError: (error) => {
      setUploadStatus('error');
      setStatusMessage(`Upload failed: ${error.message}`);
    },
  });

  const handleScreenplayParsed = (screenplay: Screenplay) => {
    setParsedScreenplay(screenplay);
    setUploadStatus('idle');
    setStatusMessage('');
  };

  const handleUpload = async () => {
    if (parsedScreenplay && session?.user) {
      uploadMutation.mutate({ screenplay: parsedScreenplay });
    }
  };

  if (!session) {
    return <div className="text-red-500 font-bold">Please sign in to upload screenplays.</div>;
  }

  return (
    <div>
      <PDFComponent onScreenplayParsed={handleScreenplayParsed} />
      {parsedScreenplay && (
        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={uploadStatus === 'uploading'}
            className={`px-4 py-2 rounded ${
              uploadStatus === 'uploading' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload to Database'}
          </button>
          {uploadStatus !== 'idle' && (
            <div className={`mt-2 ${
              uploadStatus === 'success' ? 'text-green-600' :
              uploadStatus === 'error' ? 'text-red-600' :
              'text-blue-600'
            }`}>
              {statusMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}