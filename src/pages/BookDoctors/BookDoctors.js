import React from 'react'
import BookDoctorsArea from './BookDoctorsArea/BookDoctorsArea'
import HomeThreeNavBar from '../HomeThree/HomeThreeNavBar/HomeThreeNavBar'
import Footer from '../../components/Shared/Footer'

function BookDoctors() {
  return (
    <div>
      <HomeThreeNavBar />
     <BookDoctorsArea />
     <Footer />

    </div>
  )
}

export default BookDoctors