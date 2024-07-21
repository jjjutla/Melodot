"use client";

import React, { useEffect, useState } from 'react';
import useUser from '@/app/hook/useUser';
import { getScan, getFile } from '@/utils/scanUtils';
import { Tree } from 'react-d3-tree';
import { Music, Calendar, User, Fingerprint } from 'lucide-react';

type Scan = {
  id: string;
  name: string;
  result: any | null;
  uploaded_at: string;
  user_id: string;
};

interface PageProps {
  params: {
    scanid: string;
  };
}

const treeData = (nodeCount = 100) => {
  const createNode = (id: number) => ({ name: `Node ${id}` });
  const nodes = Array.from({ length: nodeCount }, (_, i) => createNode(i + 1));
  
  const arr = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  arr(nodes);

  const tree = (nodes: any[], start = 0, end = nodes.length - 1) => {
    if (start > end) return null;
    const randomIndex = start + Math.floor(Math.random() * (end - start + 1));
    return {
      ...nodes[randomIndex],
      children: [
       tree(nodes, start, randomIndex - 1),
        tree(nodes, randomIndex + 1, end),
      ].filter(Boolean),
    };
  };

  return tree(nodes);
};

const Page = ({ params }: PageProps) => {
  const { scanid } = params;
  const { data: user, isLoading, error } = useUser();
  const [scan, setScan] = useState<Scan | null>(null);
  const [code, setCode] = useState<string>('');
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    const fetchScanDetails = async () => {
      if (user && user.id) {
        const scans = await getScan(user.id);
        const selectedScan = scans.find((s: Scan) => s.id === scanid);
        if (selectedScan) {
          setScan(selectedScan);
          const fileContent = await getFile(user.id, scanid);
          setCode(fileContent);
          const randomTreeData = tree();
          setTreeData(randomTreeData);
        }
      }
    };

    fetchScanDetails();
  }, [user, scanid]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error loading user data.</div>;
  if (!scan) return <div className="text-center py-10">No scan found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">
        {scan.name}
      </h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Music className="mr-2 text-purple-600" /> Track Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>ID:</strong> {scan.id}</p>
          <p><strong>Similarity:</strong> {typeof scan.result === 'object' ? JSON.stringify(scan.result) : scan.result}</p>
          <p className="flex items-center">
            <Calendar className="mr-2 text-purple-600" />
            <span><strong>Uploaded At:</strong> {new Date(scan.uploaded_at).toLocaleDateString()}</span>
          </p>
          <p className="flex items-center">
            <User className="mr-2 text-purple-600" />
            <span><strong>User ID:</strong> {scan.user_id}</span>
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Track Decomposition</h2>
        {treeData && (
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg">
            <div className="w-full h-[500px]">
              <Tree
                data={treeData}
                orientation="vertical"
                pathFunc="straight"
                nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10, fill: 'white', stroke: '#4B5563' } }}
                styles={{
                  links: { stroke: '#9CA3AF' },
                  nodes: {
                    node: {
                      circle: { fill: 'white', stroke: '#4B5563' },
                      name: { fill: 'white' },
                      attributes: { fill: 'white' },
                    },
                    leafNode: {
                      circle: { fill: 'white', stroke: '#4B5563' },
                      name: { fill: 'white' },
                      attributes: { fill: 'white' },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4 flex items-center justify-center">
          <Fingerprint className="mr-2 text-purple-600" /> Track Fingerprint
        </h2>
        <div className="bg-gray-200 rounded-lg p-4 shadow-md">
          <img
            src="/fingerprint.png"
            alt="Track Fingerprint"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;