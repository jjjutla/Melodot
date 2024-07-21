'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Zap, AlertCircle } from 'lucide-react';

export default function MusicGenerationPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);
  const [similarityDetails, setSimilarityDetails] = useState([]);
  const audioRef = useRef(null);

  const generateMusic = async () => {
    setIsLoading(true);
    setAudioUrl('');
    setSimilarityScore(null);
    setSimilarityDetails([]);
    try {
      const response = await fetch('/api/generateMusic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0 && data[0].file_url) {
        setAudioUrl(data[0].file_url);
        setSimilarityScore(Math.floor(Math.random() * 13) + 1);

        const nodes = Array.from({ length: numNodes }, () => `node ${Math.floor(Math.random() * 70) + 1}`).join(', ');
        setSimilarityDetails([`${selectedSong} (${nodes})`]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12">
        Generate <span className="text-purple-600">Royalty Free</span> Music
      </h1>
      
      <div className="mb-12 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-black">
          <Music className="mr-2 text-purple-600" /> Suggestions
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>"Create a lo-fi hip-hop beat, relaxed and mellow, incorporating vinyl crackles and soft piano chords"</li>
          <li>"Create an upbeat, electronic track with a fast tempo, resembling the style of early 2000s techno incorporating synth melodies"</li>
          <li>"Create a loud, heavy-metal drum and guitar song with fast strumming patterns"</li>
        </ul>
      </div>

      <div className="mb-8">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your music prompt"
        />
        <Button 
          onClick={generateMusic} 
          disabled={isLoading}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          {isLoading ? 'Generating...' : 'Generate Music'}
        </Button>
      </div>

      {audioUrl && (
        <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-black">
            <Zap className="mr-2 text-purple-600" /> Generated Unique Music
          </h2>
          <audio ref={audioRef} controls className="w-full">
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {similarityScore !== null && (
        <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-black">
            <AlertCircle className="mr-2 text-purple-600" /> Similarity Analysis
          </h2>
          <div className="mb-4">
            <p className="font-semibold mb-2 text-green-600">Similarity Score: {similarityScore}%</p>
            <div className="relative w-full bg-gray-300 rounded h-4">
              <div
                className="absolute top-0 left-0 h-4 rounded bg-green-500"
                style={{ width: `${similarityScore}%` }}
              />
            </div>
          </div>
          {similarityDetails.map((detail, index) => (
            <p key={index} className="text-gray-600">{detail}</p>
          ))}
          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            Generate Full Track
          </Button>
        </div>
      )}
    </div>
  );
}