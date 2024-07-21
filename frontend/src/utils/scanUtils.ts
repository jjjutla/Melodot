import { supabaseBrowser } from '@/lib/supabase/browser';

export const getScan = async (userId: string) => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .eq('user_id', userId);
  if (error) {
    console.error('Error fetching scans:', error);
    return [];
  }
  return data;
};

export const deleteScan = async (scanId: string, userId: string) => {
  const supabase = supabaseBrowser();
  const { error } = await supabase
    .from('scans')
    .delete()
    .eq('id', scanId)
    .eq('user_id', userId);
  if (error) {
    console.error('Error deleting scan:', error);
    return false;
  }
  return true;
};

export const getFile = async (userId: string, scanId: string) => {
  const supabase = supabaseBrowser();
  const filePath = `${userId}/${scanId}`;
  const { data, error } = await supabase
    .storage
    .from('uploads')
    .download(filePath);

  if (error) {
    console.error('Error downloading file:', error);
    return null;
  }

  const fileContent = await data.text();
  return fileContent;
};
