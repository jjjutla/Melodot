import React from 'react';
import { Music, Shield, Zap, Brain, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 mt-28 sm:mt-4 flex flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold text-gray-500 mb-4">
          Launched at the <a href="https://www.easya.io/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">EasyA Hackathon</a>
        </p>
        
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl mb-6">
          Protect Your <span className="text-purple-600">Music</span> Intellectual Property
        </h1>
        
        <p className="mt-5 max-w-prose text-gray-600 sm:text-lg mb-12">
          Fractionalise your music into individual beats, notes, and syllables. Protect the most atomic part of your music with blockchain technology. Generate truly royalty-free AI music using similarity search and OriginTrail Decentralised Knowledge Assets.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Learn More
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <FeatureCard 
            icon={<Music size={40} />}
            title="Music Fractionalization"
            description="Break down songs into atomic components for ultimate protection."
          />
          <FeatureCard 
            icon={<Shield size={40} />}
            title="Blockchain Security"
            description="Leverage immutable timestamps and NFTs for ironclad rights management."
          />
          <FeatureCard 
            icon={<Zap size={40} />}
            title="AI Music Generation"
            description="Create original, verifiably copyright-free music using advanced AI."
          />
          <FeatureCard 
            icon={<Brain size={40} />}
            title="Similarity Analysis"
            description="Ensure originality with our cutting-edge similarity search technology."
          />
        </div>

        <div className="mt-24 w-full">
          <h2 className="text-3xl font-bold mb-8">Our Roadmap</h2>
          <div className="space-y-12">
            <RoadmapSection 
              title="June 2023 (Completed)"
              items={[
                { text: "Develop Metadata Layer and Parachain for Artists to Upload Music Assets", completed: true },
                { text: "Implement Binary Tree structure for music asset organization", completed: true },
                { text: "Create custom NFT standard using Substrate Pallet", completed: true },
                { text: "Integrate PolkadotJS API for frontend-parachain connection", completed: true },
                { text: "Implement basic proof-of-concept for music fractionalization", completed: true }
              ]}
            />
            
            <RoadmapSection 
              title="July 2024 (Completed)"
              items={[
                { text: "Integrate Meta OSS AudioCraft for AI Music Generation", completed: true },
                { text: "Develop similarity analysis system using Vector DB", completed: true },
                { text: "Implement OriginTrail integration for decentralized storage and provenance tracking", completed: true },
                { text: "Create beta version of the expanded Melodot platform", completed: true },
                { text: "Develop and launch an improved landing page showcasing roadmap and progress", completed: true }
              ]}
            />
            
            <RoadmapSection 
              title="October 2024 - December 2024"
              items={[
                { text: "Expand music database by integrating with MusicBrainz API", completed: false },
                { text: "Improve audio fingerprinting system, potentially integrating AcoustID", completed: false },
                { text: "Enhance AI Music Generation to include vocals", completed: false },
                { text: "Implement cover art generation feature using AI", completed: false },
                { text: "Begin private beta testing with select artists and producers", completed: false }
              ]}
            />
            
            <RoadmapSection 
              title="January 2025 - March 2025"
              items={[
                { text: "Implement ERC-3643 token for artist-fan interactions and rewards", completed: false },
                { text: "Develop streaming service integration for royalty payments", completed: false },
                { text: "Create private rights layer for confidential and commercial songs using XCM/encryption", completed: false },
                { text: "Conduct security audits and optimize performance", completed: false }
              ]}
            />
            
            <RoadmapSection 
              title="April 2025 - June 2025"
              items={[
                { text: "Launch public beta version of Melodot", completed: false },
                { text: "Implement user feedback and bug fixes", completed: false },
                { text: "Develop partnerships with music labels and streaming platforms", completed: false },
                { text: "Expand marketing efforts to increase artist and user adoption", completed: false }
              ]}
            />
            
            <RoadmapSection 
              title="July 2025 onwards"
              items={[
                { text: "Full public launch of Melodot platform", completed: false },
                { text: "Continuous improvement based on user feedback and technological advancements", completed: false },
                { text: "Explore integration with other blockchain networks for increased interoperability", completed: false },
                { text: "Develop additional features based on music industry needs and user requests", completed: false }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
    <div className="text-purple-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const RoadmapSection = ({ title, items }) => (
  <div>
    <h3 className="text-2xl font-semibold mb-4 text-purple-600">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <RoadmapItem key={index} completed={item.completed}>{item.text}</RoadmapItem>
      ))}
    </ul>
  </div>
);

const RoadmapItem = ({ children, completed }) => (
  <li className="flex items-center space-x-3">
    <CheckCircle className={`flex-shrink-0 w-5 h-5 ${completed ? 'text-green-500' : 'text-gray-400'}`} />
    <span className={completed ? 'text-gray-700' : 'text-gray-500'}>{children}</span>
  </li>
);