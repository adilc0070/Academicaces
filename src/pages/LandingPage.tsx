import Carrosil from "../componants/Carrosil"
import NavBar from "../componants/LandingNavBar"

function LandingPage() {
  return (
    <>
      <NavBar />
      <Carrosil items={[{
        heading: 'Item 1',
        description: 'Description for item 1',
        imageName:'src/assets/giovanni-gagliardi-fvT3t9iOaJI-unsplash.jpg',
        bgColor: 'bg-sky-800',
        fontColor:'text-white'
      },
      {
        heading: 'Item 2',
        description: 'Description for item 2',
        imageName:'src/assets/mimi-thian-vdXMSiX-n6M-unsplash.jpg',
        bgColor: 'bg-sky-900',
        fontColor:'text-sky-'
      },
      {
        heading: 'Item 3',
        description: 'Description for item 3',
        imageName:'src/assets/woman-attending-online-class_23-2148854923.jpg',
        bgColor: 'bg-red-800',
        fontColor:''
      },]} />

    </>

  )
}

export default LandingPage
