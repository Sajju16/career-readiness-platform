const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://postgres:Career@2026%23Ready123@db.dlhfgcxvouujgebwkkdm.supabase.co:5432/postgres'
});
client.connect()
  .then(() => client.query('CREATE POLICY "Allow public uploads to resumes" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = "resumes");'))
  .then(() => { console.log('Policy created'); client.end(); })
  .catch(err => { console.error('Error:', err); client.end(); });
