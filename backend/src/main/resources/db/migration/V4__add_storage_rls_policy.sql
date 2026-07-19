-- Enable RLS (should be enabled by default on storage.objects, but ensuring policies exist)
-- This allows any authenticated or anonymous user to insert into the 'resumes' bucket
CREATE POLICY "Allow public uploads to resumes" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "Allow public updates to resumes" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'resumes');
CREATE POLICY "Allow public deletes from resumes" ON storage.objects FOR DELETE TO public USING (bucket_id = 'resumes');
