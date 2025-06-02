import { ProblemClient } from "@/components/DataGrid"



const ProblemsPage = async () => {
  const user = {role:"ADMIN"}
  const isAdmin = user?.role === "ADMIN"
  const problems = [{
        data:[],
        success:true,
        message:"Problem created successfully!"
    }]

  return (
    <div className="flex justify-center items-center mt-4 w-full">
      <div className="container w-full mx-auto px-4 py-8">
        <ProblemClient data={problems} isAdmin={isAdmin} />
      </div>
    </div>
  )
}

export default ProblemsPage

