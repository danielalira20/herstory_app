/// Adminlayout.tsx

import AdminNavbar from "@/components/Adminnavbar"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <main>{children}</main>
    </div>
  )
}

export default AdminLayout