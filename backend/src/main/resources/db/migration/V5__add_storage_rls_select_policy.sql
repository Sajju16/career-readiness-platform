CREATE POLICY "Allow public read to resumes" ON storage.objects FOR SELECT TO public USING (bucket_id = 'resumes');
