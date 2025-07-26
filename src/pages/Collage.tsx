
import TripCollage from "../components/TripCollage"
import Layout from "../layouts/Layout"



export default function CollagePage() {
  return (
    <div className="h-screen flex flex-col">
      <Layout>
        <TripCollage isEditing={true}/>
      </Layout>
    </div>
  )
}
