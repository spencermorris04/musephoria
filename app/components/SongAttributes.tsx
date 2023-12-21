import React from 'react';

interface SongAttributesProps {
  title: string;
  creator: string;
  genre: string;
  instruments: string[];
  lyrics: string;
}

const SongAttributes: React.FC<SongAttributesProps> = ({ title, creator, genre, instruments, lyrics }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>By {creator}</p>
      <p>Genre: {genre}</p>
      <p>Instruments: {instruments.join(', ')}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Lyrics</h3>
        <p className="whitespace-pre-wrap">{lyrics}</p>
      </div>
    </div>
  );
};

export default SongAttributes;
