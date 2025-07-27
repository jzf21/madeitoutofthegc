

import ProfileJournalBook from "../components/ProfileJournal"
import Layout from "../layouts/Layout"



export default function Journal() {


  return (
    <div className="h-screen flex flex-col">
      <Layout>
        <ProfileJournalBook/>
      </Layout>
    </div>
  )
}
