
import TripCollage from "../components/TripCollage"
import TripCollageView from "../components/TripCollageView"
import Layout from "../layouts/Layout"



export default function CollageView() {
  return (
    <div className="h-screen flex flex-col">
      <Layout>
        <TripCollageView />
      </Layout>
    </div>
  )
}
