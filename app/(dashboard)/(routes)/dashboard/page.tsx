import { UserProfile } from "@clerk/nextjs"

const page = () => {
  return (
    <div>
      <h2>Dashboard (Protected)</h2>
      <UserProfile  />
    </div>
  )
}

export default page
