import AdminUpload from "@/components/AdminUpload";

const AdminUploadPage = () => {
  const adminUserId = 1; // use your seeded admin user ID

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Upload</h1>
      <AdminUpload userId={adminUserId} />
    </div>
  );
};

export default AdminUploadPage;
