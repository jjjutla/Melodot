"use client"

import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import useUser from '@/app/hook/useUser';
import Dropzone from 'react-dropzone';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { v4 as uuidv4 } from "uuid";

const supabase = supabaseBrowser();

const UploadButton = () => {
  const { isFetching, data: user } = useUser();
  const isActive = !user?.subscription?.end_at ? false : new Date(user.subscription.end_at) > new Date();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const uploadImage = async (file: File) => {
    if (!user) return;

    const userId = user.id;
    const uuid = uuidv4();
    const { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(`${userId}/${uuid}`, file);

    if (data) {
      console.log('File uploaded successfully:', data);

      // Insert record into 'scans' table
      const { data: scanData, error: scanError } = await supabase
        .from('scans')
        .insert([
          {
            id: uuid,
            name: file.name,
            user_id: userId,
            uploaded_at: new Date(),
            result: {}, // Empty JSON
          },
        ]);

      if (scanError) {
        console.error('Error inserting scan record:', scanError);
      } else {
        console.log('Scan record inserted successfully:', scanData);
      }

      setIsOpen(false); // Close the dialog box
    } else {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => {
      if (!v) {
        setIsOpen(v);
      }
    }}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload Full Song</Button>
      </DialogTrigger>

      <DialogContent>
        <Dropzone onDrop={(acceptedFiles: File[]) => {
          acceptedFiles.forEach(file => {
            uploadImage(file);
          });
        }}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}>
              <input {...getInputProps()} />
              <Button>Upload Song</Button>
            </div>
          )}
        </Dropzone>
      </DialogContent>
    </Dialog>
  );
}

export default UploadButton;
